const Employee = require('../models/Employee')

const createEmployee = async(req, res) => {
    try {
        const {name, email, phone, city, zip} = req.body
        const employee = new Employee({
            name,
            email,
            phone,
            city,
            zip
        })
        await employee.save()
        res.status(201).json(employee)
    } catch (error) {
        console.log("There is an Error", error)
        res.status(500).json({message: "Server error"})
    }
}

const getEmployees = async(req, res) => {
    try{
        const employees = await Employee.find()
        res.status(200).json(employees)
    } catch(error){
        console.error("There is an error", error)
        res.status(500).json({message: 'Server Error'})
    }
}

const singleEmployee = async(req, res) => {
    try{
        const employee = await Employee.findById(req.params.id)
        if(!employee) {
            res.status(404).json({message: "Employee not found"})
        }
        res.status(200).json(employee)
    }catch(error) {
        console.error("There is an error", error)
        res.status(500).json({message: "Server Error"})
    }
}

const updateEmployee = async(req, res) => {
    try {
        const {name, email, phone, city, zip} = req.body
        const myEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {name, email, phone, city, zip}
        )
        if(!myEmployee) {
            return res.status(404).json({message: "Employee not found"})
        }
        res.status(200).json(myEmployee)
    } catch(error) {
        console.error("Server Error", error)
        res.status(500).json({message: 'Server Error'})
    }
}

const deleteEmployee = async(req, res) => {
    try {
        const deleteEmployee = await Employee.findByIdAndDelete(req.params.id)
        if (!deleteEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).send()
    } catch(error) {
        res.status(500).json({message: "Server Error"})
    }
}

module.exports = { createEmployee, getEmployees, singleEmployee, updateEmployee, deleteEmployee }