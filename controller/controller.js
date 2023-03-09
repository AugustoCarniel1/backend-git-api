const axios = require('axios');

module.exports = {
    async listUsers(request, response) {
        
        const since = request.query.since

        await axios.get('https://api.github.com/users?since=' + since).then(function(res) {
            var lastIndex = res.data.length

            var lastElementId = res.data[lastIndex-1]['id']

            console.log(res.data.length)
            response.json({'Next Page Link': 'https://backend-git-api.herokuapp.com/api/users?since='+lastElementId, 'List of users': res.data})
        }).catch((err) => {
            response.json(err)
        })
    },

    async searchGitProfile(request, response) {
        const { username } = request.params
        
        await axios.get('https://api.github.com/users/' + username).then(function(res) {
            response.json(res.data)
        }).catch((err) => {
            response.json(err)
        })
    },


    async searchGitRepos(request, response) {
        const { username } = request.params

        await axios.get('https://api.github.com/users/' + username + '/repos').then(function(res) {
            response.json(res.data)
        }).catch((err) => {
            response.json(err)
        })
    }
}