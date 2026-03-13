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

const pkgPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const V = pkg.version
const N = pkg.name

// releaseTime в формате "01.01.2026 14:32:07"
const now = new Date()
const pad = n => String(n).padStart(2, '0')
pkg.releaseTime =
  [pad(now.getDate()), pad(now.getMonth() + 1), now.getFullYear()].join('.') +
  ' ' +
  [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join(':')
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')

run('git add package.json package-lock.json')
run(`git commit -m "release: [${N}] ${V}"`, { env: { ...process.env, HUSKY: '0' } })
run(`git tag -a "${N}-v${V}" -m "release: [${N}] ${V}"`)
run('git tag -f release')
run('git push origin master')
run(`git push origin "${N}-v${V}"`)
run('git push origin release --force')
