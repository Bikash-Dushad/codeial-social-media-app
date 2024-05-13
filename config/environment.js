const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'xyz',
    // db: 'codeial_practice',
    smtp:     {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'officialbikash08@gmail.com',
        pass: 'Bikash@4825'
    }
}
}

const production = {
    name: 'production'
}

module.exports = development;