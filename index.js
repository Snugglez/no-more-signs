module.exports = function nomoresigns(d) {
    let signs = {}
    d.hook('S_SPAWN_BUILD_OBJECT', 2, (e) => { signs[e.gameId] = e; if (d.settings.enabled) return false })
    d.hook('S_DESPAWN_BUILD_OBJECT', 2, (e) => { if (signs[e.gameId]) delete signs[e.gameId] })
    d.hook('S_LOAD_TOPO', 'event', () => { signs = {} })

    d.command.add('signs', () => {
        if (d.settings.enabled) {
            d.settings.enabled = false;
            d.command.message(`disabled`)
            for (const [key, value] of Object.entries(signs)) { d.send('S_SPAWN_BUILD_OBJECT', 2, value) }
            return;
        }
        if (!d.settings.enabled) {
            d.settings.enabled = true;
            d.command.message(`enabled`)
            for (const [key, value] of Object.entries(signs)) { d.send('S_DESPAWN_BUILD_OBJECT', 2, { gameId: signs[key].gameId }) }
            return;
        }
    })
}
