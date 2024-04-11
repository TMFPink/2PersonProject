module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        Name:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        Phone:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        Mail:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        DOB:{
            type: DataTypes.DATE,
            allowNULL: true
        }
    })
    return User;
    
}
