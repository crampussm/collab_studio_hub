const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// video category IDs for YouTube:
const categoryIds = {
    Entertainment: 24,
    Education: 27,
    ScienceTechnology: 28
}

function uploadVideo(auth, videoLink, thumbnailLink, captionslink, title, description, tags) {
    const service = google.youtube('v3')
  
    service.videos.insert({
      auth: auth,
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags,
          categoryId: categoryIds.ScienceTechnology,
          defaultLanguage: 'en',
          defaultAudioLanguage: 'en'
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: videoLink,
      },
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log(response.data)
  
      console.log('Video uploaded. Uploading the thumbnail now.')
      service.thumbnails.set({
        auth: auth,
        videoId: response.data.id,
        media: {
          body: thumbnailLink,
        },
      }, function(err, response) {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
        console.log(response.data)
    
        console.log('Video uploaded. Uploading the thumbnail now.')
        service.thumbnails.set({
          auth: auth,
          videoId: response.data.id,
          media: {
            body: captionslink,
          },
        }, function(err, response){
          if (err) {
            console.log('The API returned an error: ' + err);
            return;
          }
          console.log(response.data)
        })
      })
    });

    return {"messege": "video uploaded succesfully"};
}


module.exports = uploadVideo;