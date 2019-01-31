// // const fetch = require('node-fetch');
// // const  AbortController =require('abort-controller')
const fs = require('fs');
const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
const { fetch } = abortableFetch(require('node-fetch'));
const controller = new AbortController()
const signal = controller.signal

function testData() {

    try {

        setTimeout(() => {
            controller.abort()
        }, 100)
        // fetch('http://46.40.5.99:8000/arena_1_high', {
        //     method: 'get',
        //     signal: signal
        //  })
        //     .then(res => {
        //         if (res) {
        //             return res.text()
        //         } else {
        //             return ""
        //         }
        //     }
        //     )
        //     .then(body => console.log(body));
        fetch('http://api.github.com', { signal })
            .then(res => {
                if (res) {
                    return res.text()
                } else {
                    return ""
                }
            }
            )
            .then(body => {
                console.log(body)
                fs.writeFile("test.txt", body, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                });
            })
            .catch((err) => {
                console.log('Fetch Error' + err)
                
            });

    } catch (err) {
        console.log('Error' + err)
    }

}

module.exports =  {
    testData: testData
}
