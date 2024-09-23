import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// Cloud function that runs once per day
exports.scheduledFunction = functions.pubsub.v2.schedule('every 24 hours').onRun(async () => {
  const now = admin.firestore.Timestamp.now();
  const oneDayAgo = new admin.firestore.Timestamp(now.seconds - 24 * 60 * 60, now.nanoseconds); // 24 hours ago

  try {
    const attendanceRef = db.collection('attendance');
    const oldRecordsQuery = attendanceRef.where('timestamp', '<=', oneDayAgo);
    const snapshot = await oldRecordsQuery.get();

    if (snapshot.empty) {
      console.log('No old records to delete');
      return null;
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Successfully deleted ${snapshot.size} old attendance records.`);
    return null;
  } catch (error) {
    console.error('Error deleting old records:', error);
    return null;
  }
});
