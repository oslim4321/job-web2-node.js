const User = require("../models/User")
const jwt = require('jsonwebtoken')
const job = require('../models/Job')
const { findOne } = require("../models/Job")


module.exports.getAllJobs = async (req, res) => {
    const jobs = await job.find({ createdBy: req.user._id }).sort({ createdAt: -1 })
    // console.log(jobs)
    res.status(200).json({jobs, count: jobs.length})
}

module.exports.getJob = async (req, res) => {
    
    let IdGet = req.params.id
    const jobs = await job.findById(IdGet)
    res.json({jobs})
    // console.log(jobs)
}

module.exports.createJob = async (req, res) => {
    console.log(req.body)
    // const UserData = req.user
    req.body.createdBy = req.user._id
    const Job = await job.create(req.body)
    console.log({ Job })
    res.status(200).json({Job, success:'Added'})
}

module.exports.updateJob = async (req, res) => {
    let IdGet = req.params.id;
    // console.log(IdGet)
    // console.log(req.user, 'user online')
   
    const jobs = await job.findByIdAndUpdate(IdGet, req.body,
    {
        new: true,
        runValidators: true,
    })
    console.log( jobs)
    res.json(jobs)
   
}

module.exports.deleteJob = async (req, res) => {
    let id = req.params.id
    const jobs = await job.findByIdAndDelete(id)
    res.status(200).json({jobs})
    console.log(jobs)
   

}

// module.exports = {varify}

