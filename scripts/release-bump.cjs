/**
 * Вызывается из .husky/post-commit.
 * Если текущая ветка master и последний коммит не "release: ...",
 * увеличивает patch-версию, создаёт коммит "release: $V", теги v$V и release, пушит в origin.
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const root = path.resolve(__dirname, '..')

function run(cmd, opts = {}) {
  execSync(cmd, { cwd: root, stdio: 'inherit', ...opts })
}

function getBranch() {
  return execSync('git branch --show-current', { cwd: root, encoding: 'utf-8' }).trim()
}

function getLastCommitMessage() {
  return execSync('git log -1 --pretty=%s', { cwd: root, encoding: 'utf-8' }).trim()
}

const branch = getBranch()
if (branch !== 'master') {
  process.exit(0)
}

const msg = getLastCommitMessage()
if (msg.startsWith('release: ')) {
  process.exit(0)
}

// Bump
run('npm version patch --no-git-tag-version', {
  env: { ...process.env, npm_config_commit_hooks: 'false' },
})

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'))
const V = pkg.version

run('git add package.json package-lock.json')
run(`git commit -m "release: ${V}"`, { env: { ...process.env, HUSKY: '0' } })
run(`git tag -a "v${V}" -m "release: ${V}"`)
run('git tag -f release')
run('git push origin master')
run(`git push origin "v${V}"`)
run('git push origin release --force')
