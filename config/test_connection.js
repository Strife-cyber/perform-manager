import sequelize from './database.js'

export const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected')
    } catch (error) {
        console.error('An error occured', error)
    }
}

testConnection();