module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'table', 
        {
            table_id: {
                type: DataTypes.STRING(50),
                allowNull: true,
                unique: true,
                primaryKey: true
            },
            table_title: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            table_autor: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            table_text: {
                type: DataTypes.STRING(250),
                allowNull: true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
        }
    )
};