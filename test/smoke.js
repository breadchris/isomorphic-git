import test from 'ava'
import fs from 'fs'
import del from 'delete'
let exists = fs.existsSync
import git from '../lib/models/Git'

test(async t => {
  let conf = git('.').config()
  let sym = await conf.get('core.symlinks')
  let rfv = await conf.get('core.repositoryformatversion')
  let url = await conf.get('remote "origin".url')
  t.is(sym, false)
  t.is(rfv, '0')
  t.is(url, 'https://github.com/wmhilton/esgit')
})

test(async t => {
  await del('foo1')
  await git('foo1').init()
  t.true(exists('foo1'))
  t.true(exists('foo1/.git/objects'))
  t.true(exists('foo1/.git/refs/heads'))
  t.true(exists('foo1/.git/HEAD'))
})

test(async t => {
  await del('foo2')
  await git('foo2').clone('https://github.com/wmhilton/nde')
  t.true(exists('foo2'))
  t.true(exists('foo2/.git/objects'))
  t.true(exists('foo2/.git/refs/remotes/origin/master'))
})

test(async t => {
  await del('foo1')
  await del('foo2')
  t.pass()
})