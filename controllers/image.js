const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

const handleApiCall = (req, res) => {
    // Your PAT (Personal Access Token) can be found in the Clarifai Account's Security section
    const PAT = process.env.PAT_CLARIFAI;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'r0823712';
    const APP_ID = 'face-detection';
    // Change these to whatever model and model version you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "model": {
            "id": MODEL_ID,
        },
        "inputs": [
          {
            "data": {
                "image": {
                    "url": req.body.input, // Get the image URL from the frontend
                    // "base64": IMAGE_BYTES_STRING
                  
                }
            }
          }
        ],
    
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };


    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    fetch(`https://api.clarifai.com/v2/users/${USER_ID}/apps/${APP_ID}/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if(data) {
            res.json(data) // Send the API response back to the frontend
        }
    })
    .catch(err => res.status(400).json('Unable to work with API'))


}




module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
} 








