import { database } from '../../src/database/index'

export default () => {

    const construirTabelas = Object.keys(database.models).map(key => {
        return database.models[key]
            .sync({ force: true })
    })
    return Promise.all(
        construirTabelas
    )
}
//.destroy({ truncate: true, force: true })