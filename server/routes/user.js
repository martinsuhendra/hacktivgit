const router = require('express').Router()
const userController = require('../controllers/user-controller')

router.get('/users', userController.getRepos);
router.get('/users/:username/repos', userController.personalRepo);
router.post('/users', userController.createRepo);
router.delete('/users/:owner/:repoName', userController.deleteRepo);
router.get('/user/starred', userController.starred);
router.get('/user/starred/filter', userController.searchRepo);
router.get('/user/starred/search', userController.searchName);
router.delete('/user/starred/:owner/:repo', userController.unstar);

module.exports = router