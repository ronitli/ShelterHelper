import { db } from "../../firebase";


const functions = require("firebase-functions");

exports.deleteOldDogsFromArchive = functions.pubsub
  .schedule("every day 12:00") // Adjust the schedule as needed
  .timeZone("Asia/Jerusalem") // Set your timezone
  .onRun(async (context) => {
    const archiveRef = db.collection("DogsArchive");
    const snapshot = await archiveRef.get();

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // 30 days ago

    const deletePromises = [];

    snapshot.forEach((doc) => {
      const deleteTimestamp = doc.data().deleteTimestamp.toDate();

      if (deleteTimestamp <= currentDate) {
        deletePromises.push(doc.ref.delete());
      }
    });

    await Promise.all(deletePromises);

    console.log("Deleted old dogs from the archive.");

    return null;
  });
