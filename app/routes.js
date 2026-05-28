//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// --- Live Service Routes ---

// One time code form error handling
router.post('/authentication/live-service/code-check', function (req, res) {
  const code = req.session.data['eventName']

  if (!code || code.trim() === "") {
    // Use a specific variable for this page
    req.session.data['codeError'] = true
    res.redirect('/authentication/live-service/code')
  } else {
    // SUCCESS: Clear the specific error flag
    req.session.data['codeError'] = false
    delete req.session.data['eventName'] 
    res.redirect('/authentication/live-service/jobs/access')
  }
})

// Ensure the code error is cleared when first arriving from the start page
router.post('/authentication/live-service/start-check', function (req, res) {
  const email = req.session.data['emailAddress']

  if (!email) {
    req.session.data['error'] = true
    res.redirect('/authentication/live-service/sign-in')
  } else {
    req.session.data['error'] = false
    req.session.data['codeError'] = false // Reset code error for a fresh start
    res.redirect('/authentication/live-service/code')
  }
})

router.get('/authentication/live-service/start-fresh', function (req, res) {
  req.session.data['error'] = false
  res.redirect('/authentication/live-service/sign-in')
})

module.exports = router




// --- UCD Review Iteration Routes ---

// Check email input on sign-in
router.post('/authentication/iteration/ucd-review/start-check', function (req, res) {
  const email = req.session.data['emailAddress']

  // Validation: Check if empty OR if it doesn't contain an '@' character
  if (!email || email.trim() === "" || !email.includes('@')) {
    req.session.data['error'] = true
    res.redirect('/authentication/iteration/ucd-review/sign-in')
  } else {
    // SUCCESS: Clear error flags and head to the code entry page
    req.session.data['error'] = false
    req.session.data['codeError'] = false // Reset code error for a fresh start
    res.redirect('/authentication/iteration/ucd-review/code')
  }
})

// Check email input on request new code page
router.post('/authentication/iteration/ucd-review/request-check', function (req, res) {
  const email = req.session.data['emailAddress']

  // Validation: Check if empty OR if it doesn't contain an '@' character
  if (!email || email.trim() === "" || !email.includes('@')) {
    req.session.data['error'] = true
    res.redirect('/authentication/iteration/ucd-review/request')
  } else {
    // SUCCESS: Clear error flags and head to the code entry page
    req.session.data['error'] = false
    req.session.data['codeError'] = false // Reset code error for a fresh start
    res.redirect('/authentication/iteration/ucd-review/code')
  }
})

// One time code form error handling for UCD review
router.post('/authentication/iteration/ucd-review/code-check', function (req, res) {
  const code = req.session.data['eventName']

  if (!code || code.trim() === "") {
    req.session.data['codeError'] = true
    res.redirect('/authentication/iteration/ucd-review/code')
  } else {
    req.session.data['codeError'] = false
    delete req.session.data['eventName'] 
    res.redirect('/authentication/iteration/ucd-review/jobs/access')
  }
})

// Whenever a user visits the sign-in page directly, reset the error flag 
router.get('/authentication/iteration/ucd-review/sign-in', function (req, res) {
  // Clear the error flag so it's fresh
  req.session.data['error'] = false
  
  // Render the view template manually
  res.render('authentication/iteration/ucd-review/sign-in')
})

// Whenever a user visits the request a new code page directly, reset the error flag 
router.get('/authentication/iteration/ucd-review/request-check', function (req, res) {
  // Clear the error flag so it's fresh
  req.session.data['error'] = false
  
  // Render the view template manually
  res.render('authentication/iteration/ucd-review/request-check')
})