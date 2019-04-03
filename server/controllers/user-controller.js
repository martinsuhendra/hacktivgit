const axios = require('axios');
let ax = axios.create({
    baseURL: 'https://api.github.com'
})

ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

class UserController {
    static getRepos(req, res) {
        ax
            .get('/user')
            .then(({ data }) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    }

    static personalRepo(req,res) {
        ax
          .get(`/users/${req.params.username}/repos`)
          .then(({ data }) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    static createRepo(req, res) {
        
        ax
            .post('/user/repos', {
                name: req.body.name
            })
            .then(({data }) => {
                console.log({data })
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static deleteRepo(req, res) {
        ax
            .delete(`/repos/${req.params.owner}/${req.params.repoName}`)
            .then(({
                data
            }) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static starred(req, res) {
        ax
            .get(`/user/starred`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static searchName(req, res) {
        ax
            .get(`/user/starred`)
            .then(({ data }) => {
                let starred = []
                data.forEach(datum => {
                    if (datum.owner.login == req.query.username) {
                        starred.push(datum)
                    }
                });
                res.status(200).json(starred)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static searchRepo(req, res) {
        ax
            .get(`/user/starred`)
            .then(({ data }) => {
                let starred = {}
                data.forEach(datum => {
                    if (datum.name == req.query.repoName) {
                        starred = datum
                    }
                });
                res.status(200).json(starred)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static unstar(req, res) {
        ax
            .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
            .then(() => {
                res.status(200).json(`repo successfully unstar`)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController