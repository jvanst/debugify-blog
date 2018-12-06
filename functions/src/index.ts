import * as functions from 'firebase-functions';

exports.createPost = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap, context) => {
    return snap.ref.set({
      title: snap.data().title,
      short_description: snap.data().short_description,
      date: new Date().getTime(),
      author: 'James',
    });
  });

exports.sanatizePost = functions.firestore
  .document("posts/{postId}/content/html")
  .onCreate((snap, content) => {
    // do something with html
  });