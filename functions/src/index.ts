import * as functions from 'firebase-functions';

exports.createPost = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap, context) => {
    let title = "";
    let short_description = "";

    if (snap.data().title) {
      title = snap.data().title
    }
    if (snap.data().short_description) {
      short_description = snap.data().short_description;
    }

    return snap.ref.set({
      title,
      short_description,
      date: new Date().getTime(),
      author: 'James',
    });
  });

// exports.sanatizePost = functions.firestore
//   .document("posts/{postId}/content/html")
//   .onCreate((snap, content) => {
//     // do something with html
//   });