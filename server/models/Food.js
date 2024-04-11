module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define("Food", {
        Name:{
            type: DataTypes.STRING,
            allowNULL: false
        },
        Protein:{
            type: DataTypes.DOUBLE,
            allowNULL: false
        },
        Fat:{
            type: DataTypes.DOUBLE,
            allowNULL: false
        },
        Carb:{
            type: DataTypes.DOUBLE,
            allowNULL: false
        },
        Instruction: {
            type: DataTypes.STRING,
            allowNULL: true
        }
    })
    return Food;
    
}
