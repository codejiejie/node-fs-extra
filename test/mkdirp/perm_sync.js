var assert = require('assert')
var fs = require('fs')
var path = require('path')
var fse = require('../../')
var testutil = require('testutil')

describe('mkdirp / perm_sync', function() {
  var TEST_DIR

  before(function() {
    TEST_DIR = testutil.createTestDir('fs-extra')
  })

  afterEach(function(done) {
    fse.remove(TEST_DIR, done)
  })

  it('sync perm', function (done) {
    var file = path.join(TEST_DIR, (Math.random() * (1<<30)).toString(16) + '.json')
    
    fse.mkdirpSync(file, 0755)
    fs.exists(file, function (ex) {
      assert.ok(ex, 'file created')
      fs.stat(file, function (err, stat) {
        assert.ifError(err)
        assert.equal(stat.mode & 0777, 0755)
        assert.ok(stat.isDirectory(), 'target not a directory')
        done()
      })
    })
  })

  it('sync root perm', function (done) {    
    var file = TEST_DIR
    fse.mkdirpSync(file, 0755)
    fs.exists(file, function (ex) {
      assert.ok(ex, 'file created')
      fs.stat(file, function (err, stat) {
        assert.ifError(err)
        assert.ok(stat.isDirectory(), 'target not a directory')
        done()
      })
    })
  })
})

