const express = require('express');
const JobRoute = express.Router()
const auth = require('../controllers/jobs')

JobRoute.get('/', auth.getAllJobs)
JobRoute.post('/',auth.createJob)
JobRoute.get('/:id', auth.getJob)
JobRoute.patch('/:id', auth.updateJob)
JobRoute.delete('/:id', auth.deleteJob)


module.exports = JobRoute