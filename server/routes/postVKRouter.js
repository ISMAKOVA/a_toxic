const Router = require('express')
const router = new Router()
const postVKController = require('../controllers/postVKController')

router.get('/', postVKController.getAll)
router.get('/:id', postVKController.getOne)
router.get('/:id/fromVK', postVKController.getPostVK)
router.get('/:id/byGroup', postVKController.getAllByGroupId)
router.post('/', postVKController.create)
router.delete('/:id', postVKController.delete)
router.put('/:id', postVKController.update)

module.exports = router
