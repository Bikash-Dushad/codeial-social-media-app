module.exports.setFlash = async (req, res, Next)=>{
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    Next();
}