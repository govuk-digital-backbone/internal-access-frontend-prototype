//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// One time code form error handling
router.post('/live-service/code-check', function (req, res) {
  const code = req.session.data['eventName']

  if (!code || code.trim() === "") {
    // Use a specific variable for this page
    req.session.data['codeError'] = true
    res.redirect('/live-service/code')
  } else {
    // SUCCESS: Clear the specific error flag
    req.session.data['codeError'] = false
    delete req.session.data['eventName'] 
    res.redirect('/live-service/jobs/access')
  }
})

// Ensure the code error is cleared when first arriving from the start page
router.post('/live-service/start-check', function (req, res) {
  const email = req.session.data['emailAddress']

  if (!email) {
    req.session.data['error'] = true
    res.redirect('/live-service/sign-in')
  } else {
    req.session.data['error'] = false
    req.session.data['codeError'] = false // Reset code error for a fresh start
    res.redirect('/live-service/code')
  }
})

router.get('/live-service/start-fresh', function (req, res) {
  req.session.data['error'] = false
  res.redirect('/live-service/sign-in')
})

module.exports = router