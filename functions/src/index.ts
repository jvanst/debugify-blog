import * as functions from 'firebase-functions';
import { DocumentSnapshot } from 'firebase/firestore';

exports.createPost = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap: DocumentSnapshot) => {
    return snap.ref.set({
      uid: snap.data().uid,
      author: snap.data().author,
      title: snap.data().title,
      short_description: snap.data().short_description,
      date: new Date().getTime(),
    });
  });

// exports.sanatizePost = functions.firestore
//   .document("posts/{postId}/content/html")
//   .onCreate((snap, content) => {
//     // do something with html
//   });