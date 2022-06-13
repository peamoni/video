import * as functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/providers/https";
import fetch from "node-fetch";
import UnZip = require("node-zip");

// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();

export interface Render {
  uid: string;
  artifact: any;
  conf: any;
  author_id: string;
  runId: string;
  status: number;
  timestamp: number;
}

enum RunStatus {
  Waiting = 1,
  Rendering,
  Created,
  Downloaded,
}

export const render = functions
  .runWith({ secrets: ["GITHUB_ACTIONS_API_BEARER"] })
  .region("europe-west1")
  .https.onCall(async (data: { conf: any }, context: CallableContext) => {
    // Verify Firebase Auth ID token
    if (!context.auth) {
      return { message: "Authentication Required!", code: 401 };
    }
    // Insert run and get ID
    const writeResult = await admin
      .firestore()
      .collection("renders")
      .add({
        author_id: context.auth.uid,
        conf: data.conf,
        timestamp: Date.now() / 1000,
        status: RunStatus.Waiting,
      });

    // Generate callback URL for GitHub Actions
    const callbackURL = `${process.env.CALLBACK_URL}?uid=${writeResult.id}`;

    // HTTP Post to GitHub Actions
    const response = await fetch(
      `${process.env.GITHUB_ACTION_URL!}/workflows/render-video.yml/dispatches`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_ACTIONS_API_BEARER}`,
        },
        body: JSON.stringify({
          inputs: {
            callback_url: callbackURL,
            ...data.conf,
          },
          ref: process.env.GITHUB_ACTION_BRANCH,
        }),
      }
    );

    await response.text();
    if (response.status !== 200) {
      return { message: "Oups...", code: response.status };
    }
    return { message: { uid: writeResult.id }, code: 200 };
  });

export const update = functions
  .runWith({ secrets: ["GITHUB_ACTIONS_API_BEARER"] })
  .region("europe-west1")
  .https.onRequest(
    async (req: functions.https.Request, resp: functions.Response<any>) => {
      const uid = req.query.uid as string;
      const runId = req.query.runId as string;
      const status = parseInt(req.query.status as string);

      console.log(uid, runId, status);
      if (!uid || !runId || !status) {
        resp.status(400).send("Bad request");
        return;
      }
      const run = await admin.firestore().collection("renders").doc(uid).get();
      if (!run.exists) {
        resp.status(404).send("Not found");
        return;
      }

      await admin
        .firestore()
        .collection("renders")
        .doc(uid)
        .update({
          ...run.data(),
          runId,
          status,
        });
      resp.status(200).send("OK");
    }
  );

export const video = functions
  .runWith({ secrets: ["GITHUB_ACTIONS_API_BEARER"] })
  .region("europe-west1")
  .https.onRequest(
    async (req: functions.https.Request, resp: functions.Response<any>) => {
      const uid = req.query.uid as string;

      if (!uid) {
        resp.status(400).send("Bad request");
        return;
      }
      const run = await admin.firestore().collection("renders").doc(uid).get();
      if (!run.exists) {
        resp.status(404).send("Run Not found");
        return;
      }

      const runData = run.data() as Render;
      if (!runData.artifact) {
        if (runData.status === RunStatus.Created) {
          const url = `${process.env.GITHUB_ACTION_URL!}/runs/${
            runData.runId
          }/artifacts`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GITHUB_ACTIONS_API_BEARER}`,
            },
          });
          const artifacts: { total_count: number; artifacts: any[] } =
            await response.json();
          if (artifacts.total_count === 1) {
            runData.artifact = artifacts.artifacts[0];
            await admin
              .firestore()
              .collection("renders")
              .doc(uid)
              .update(runData);
          }
        }
      }

      const response = await fetch(runData.artifact.archive_download_url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACTIONS_API_BEARER}`,
        },
      });
      const data = await response.buffer();
      // unzip data from buffer
      const zip = new UnZip();
      zip.load(data);
      const video = zip.files["video.mp4"];
      if (!video) {
        resp.status(404).send("Video Not found");
        return;
      }
      resp.set("Content-Type", "video/mp4");
      resp.set("Content-Disposition", "attachment");
      resp.status(200).send(video.asNodeBuffer());
    }
  );
