'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  GitBranch,
  GitMerge,
  Code,
  CheckCircle,
  Menu,
  X,
  Terminal,
  BookOpen,
  AlertCircle,
  Zap,
} from 'lucide-react';

export default function GitFlowTutorial() {
  const [expandedSections, setExpandedSections] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleComplete = (id) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections = [
    {
      id: 'intro',
      title: 'Pengenalan Git Flow',
      icon: BookOpen,
      color: 'blue',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Git Flow adalah workflow standard untuk team development. Alur ini memastikan setiap anggota team bisa bekerja paralel tanpa konflik.
          </p>
          <div className="bg-blue-950/50 border-l-4 border-blue-500 p-4">
            <p className="text-blue-300 font-medium">
              💡 Workflow ini cocok untuk team yang ingin maintain code quality dan prevent merge conflicts.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'fetch',
      title: '1. FETCH - Update Repository',
      icon: GitBranch,
      color: 'green',
      steps: [
        {
          id: 'fetch-explain',
          title: 'Apa itu Fetch?',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">
                Fetch mengambil informasi terbaru dari remote repository <strong>tanpa mengubah</strong> file lokal.
              </p>
              <div className="bg-green-950/30 p-4 rounded border border-green-800">
                <p className="text-green-300 font-semibold mb-2">Keuntungan Fetch:</p>
                <ul className="list-disc list-inside space-y-1 text-green-200 text-sm">
                  <li>Aman - tidak langsung merge changes</li>
                  <li>Bisa lihat perubahan sebelum merge</li>
                  <li>Mencegah konfliks yang tidak terduga</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          id: 'fetch-command',
          title: 'Perintah Fetch',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Jalankan perintah ini di awal development:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono">
                <div className="text-blue-400">$ git fetch origin</div>
              </div>
              <div className="bg-green-950/30 p-3 rounded border border-green-800">
                <p className="text-green-300 text-sm">
                  <strong>Penjelasan:</strong> Ambil semua perubahan dari server ke local repository (belum merge ke working directory)
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'fetch-verify',
          title: 'Verifikasi Branch Terbaru',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Lihat branch yang tersedia:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono">
                <div className="text-blue-400">$ git branch -a</div>
                <div className="text-gray-500 mt-2">
                  * main
                  <br />
                  develop
                  <br />
                  feature/login
                  <br />
                  remotes/origin/main
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'stash',
      title: '2. STASH - Simpan Perubahan Temporary',
      icon: Code,
      color: 'purple',
      steps: [
        {
          id: 'stash-explain',
          title: 'Kapan Perlu Stash?',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">
                Gunakan stash ketika ada perubahan lokal yang belum siap dicommit, tapi butuh switch branch atau pull changes.
              </p>
              <div className="bg-purple-950/30 p-4 rounded border border-purple-800">
                <p className="text-purple-300 font-semibold mb-2">Contoh Scenario:</p>
                <ul className="list-disc list-inside space-y-1 text-purple-200 text-sm">
                  <li>Lagi ngerjain feature tapi butuh urgent fix di branch lain</li>
                  <li>Ingin bersihkan working directory sebelum pull</li>
                  <li>Belum siap commit tapi ingin cek branch lain</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          id: 'stash-command',
          title: 'Perintah Stash',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Simpan perubahan temporary:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono space-y-2">
                <div className="text-blue-400">$ git stash save "deskripsi perubahan"</div>
                <div className="text-gray-500 mt-2">atau</div>
                <div className="text-blue-400">$ git stash</div>
              </div>
              <div className="bg-purple-950/30 p-3 rounded border border-purple-800">
                <p className="text-purple-300 text-sm">
                  <strong>Output:</strong> Stashed working directory clean
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'stash-list',
          title: 'Lihat List Stash',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Lihat semua stash yang disimpan:</p>
              <div className="bg-black text-gray-100 p4 rounded-lg border border-gray-700 font-mono">
                <div className="text-blue-400">$ git stash list</div>
                <div className="text-gray-500 mt-2">
                  stash@0: On feature/login: deskripsi perubahan
                  <br />
                  stash@1: On develop: fix bug database
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'pull',
      title: '3. PULL - Download & Merge Changes',
      icon: GitMerge,
      color: 'blue',
      steps: [
        {
          id: 'pull-explain',
          title: 'Apa itu Pull?',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">
                Pull = Fetch + Merge. Mengambil perubahan dari remote dan langsung merge ke branch lokal.
              </p>
              <div className="bg-blue-950/30 p-4 rounded border border-blue-800">
                <p className="text-blue-300 font-semibold mb-2">Formula:</p>
                <p className="text-blue-200 text-sm font-mono">
                  git pull origin [branch] = git fetch + git merge origin/[branch]
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'pull-command',
          title: 'Perintah Pull',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Update branch dengan changes terbaru:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono space-y-2">
                <div className="text-blue-400">$ git pull origin main</div>
                <div className="text-gray-500 mt-3">atau untuk current branch:</div>
                <div className="text-blue-400">$ git pull</div>
              </div>
              <div className="bg-blue-950/30 p-3 rounded border border-blue-800">
                <p className="text-blue-300 text-sm">
                  <strong>Output:</strong> Fast-forward atau Merge made by 'recursive' strategy
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'pull-conflict',
          title: 'Jika Ada Conflict',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Jika ada perubahan konflik:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono text-sm">
                <div className="text-red-400">{'<<<<<<< HEAD'}</div>
                <div className="text-green-400">// kode lokal</div>
                <div className="text-gray-500">=======</div>
                <div className="text-blue-400">// kode dari remote</div>
                <div className="text-red-400">{'>>>>>>> origin/main'}</div>
              </div>
              <div className="bg-yellow-950/30 p-3 rounded border border-yellow-800">
                <p className="text-yellow-300 text-sm">
                  <strong>Solusi:</strong> Edit file, pilih kode mana yang dipakai, hapus marker, lalu commit
                </p>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'pop',
      title: '4. POP - Ambil Kembali Stash',
      icon: Zap,
      color: 'orange',
      steps: [
        {
          id: 'pop-explain',
          title: 'Apa itu Pop?',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">
                Pop mengambil stash yang sudah disimpan dan menerapkannya kembali ke working directory.
              </p>
              <div className="bg-orange-950/30 p-4 rounded border border-orange-800">
                <p className="text-orange-300 font-semibold mb-2">Catatan:</p>
                <p className="text-orange-200 text-sm">
                  Pop akan menghapus stash setelah apply. Gunakan <code className="bg-orange-950 px-1">apply</code> jika ingin keep stash.
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'pop-command',
          title: 'Perintah Pop',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Ambil perubahan dari stash:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono space-y-2">
                <div className="text-blue-400">$ git stash pop</div>
                <div className="text-gray-500 mt-3">atau untuk stash tertentu:</div>
                <div className="text-blue-400">$ git stash pop stash@0</div>
              </div>
              <div className="bg-orange-950/30 p-3 rounded border border-orange-800">
                <p className="text-orange-300 text-sm">
                  <strong>Output:</strong> On branch feature/login. Perubahan sudah di-apply
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'pop-vs-apply',
          title: 'Pop vs Apply',
          content: (
            <div className="space-y-3">
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700">
                <div className="font-semibold text-blue-400 mb-2">git stash pop</div>
                <p className="text-sm text-gray-300 mb-3">✓ Apply changes + Hapus stash</p>
                <div className="font-semibold text-green-400 mb-2">git stash apply</div>
                <p className="text-sm text-gray-300">✓ Apply changes + Keep stash (bisa dipakai ulang)</p>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'checkout',
      title: '5. CHECKOUT - Pindah Branch',
      icon: GitBranch,
      color: 'pink',
      steps: [
        {
          id: 'checkout-explain',
          title: 'Apa itu Checkout?',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">
                Checkout untuk switch antar branch atau membuat branch baru.
              </p>
              <div className="bg-pink-950/30 p-4 rounded border border-pink-800">
                <p className="text-pink-300 font-semibold mb-2">Gunakan untuk:</p>
                <ul className="list-disc list-inside space-y-1 text-pink-200 text-sm">
                  <li>Pindah ke branch yang sudah ada</li>
                  <li>Membuat branch baru</li>
                  <li>Kembali ke branch main/develop</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          id: 'checkout-switch',
          title: 'Switch ke Branch Lain',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Pindah ke branch yang sudah ada:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono">
                <div className="text-blue-400">$ git checkout main</div>
                <div className="text-gray-500 mt-2">atau (modern syntax):</div>
                <div className="text-blue-400">$ git switch main</div>
              </div>
            </div>
          ),
        },
        {
          id: 'checkout-create',
          title: 'Buat Branch Baru',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Buat dan pindah ke branch baru:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono space-y-2">
                <div className="text-blue-400">$ git checkout -b feature/login</div>
                <div className="text-gray-500 mt-3">atau (modern syntax):</div>
                <div className="text-blue-400">$ git switch -c feature/login</div>
              </div>
              <div className="bg-pink-950/30 p-3 rounded border border-pink-800">
                <p className="text-pink-300 text-sm">
                  <strong>Naming Convention:</strong> feature/nama-fitur, bugfix/nama-bug, hotfix/nama-fix
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 'checkout-current',
          title: 'Lihat Branch Current',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Cek branch mana yang sedang aktif:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono">
                <div className="text-blue-400">$ git branch</div>
                <div className="text-gray-500 mt-2">
                  * main
                  <br />
                  develop
                  <br />
                  feature/login
                </div>
              </div>
              <p className="text-sm text-gray-400">Tanda * menunjukkan branch aktif saat ini</p>
            </div>
          ),
        },
      ],
    },
    {
      id: 'merge',
      title: '6. MERGE - Gabung Perubahan',
      icon: GitMerge,
      color: 'red',
      steps: [
        {
          id: 'merge-explain',
          title: 'Apa itu Merge?',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">
                Merge menggabungkan perubahan dari satu branch ke branch lain.
              </p>
              <div className="bg-red-950/30 p-4 rounded border border-red-800">
                <p className="text-red-300 font-semibold mb-2">Workflow Umum:</p>
                <ol className="list-decimal list-inside space-y-1 text-red-200 text-sm">
                  <li>Selesai development di feature branch</li>
                  <li>Switch ke main/develop</li>
                  <li>Merge feature branch</li>
                  <li>Push ke remote</li>
                </ol>
              </div>
            </div>
          ),
        },
        {
          id: 'merge-command',
          title: 'Perintah Merge',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Langkah-langkah merge:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono space-y-3">
                <div>
                  <div className="text-gray-500"># 1. Switch ke branch tujuan</div>
                  <div className="text-blue-400">$ git checkout main</div>
                </div>
                <div>
                  <div className="text-gray-500"># 2. Update dengan latest</div>
                  <div className="text-blue-400">$ git pull origin main</div>
                </div>
                <div>
                  <div className="text-gray-500"># 3. Merge branch</div>
                  <div className="text-blue-400">$ git merge feature/login</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'merge-conflict',
          title: 'Handle Merge Conflict',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Jika ada conflict saat merge:</p>
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono text-sm">
                <div className="text-red-400">CONFLICT (content): Merge conflict in file.js</div>
              </div>
              <div className="bg-red-950/30 p-4 rounded border border-red-800 space-y-2">
                <p className="text-red-300 font-semibold">Langkah Resolusi:</p>
                <ol className="list-decimal list-inside space-y-1 text-red-200 text-sm">
                  <li>Edit file yang conflict</li>
                  <li>Pilih kode dari mana (current atau incoming)</li>
                  <li>Hapus marker conflict</li>
                  <li>git add . && git commit -m "Merge conflict resolved"</li>
                </ol>
              </div>
            </div>
          ),
        },
        {
          id: 'merge-fast-forward',
          title: 'Fast-Forward vs Merge Commit',
          content: (
            <div className="space-y-3">
              <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 space-y-3">
                <div>
                  <div className="font-semibold text-green-400">Fast-Forward Merge</div>
                  <p className="text-sm text-gray-300 mt-1">Terjadi ketika branch linear (tidak ada divergence)</p>
                  <div className="text-blue-400 text-sm mt-1">$ git merge --ff feature/login</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-400">Merge Commit</div>
                  <p className="text-sm text-gray-300 mt-1">Membuat commit baru yang menunjukkan merge</p>
                  <div className="text-blue-400 text-sm mt-1">$ git merge --no-ff feature/login</div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'workflow',
      title: '7. Complete Git Flow Workflow',
      icon: Terminal,
      color: 'teal',
      steps: [
        {
          id: 'workflow-complete',
          title: 'Full Workflow Example',
          content: (
            <div className="space-y-3">
              <p className="text-gray-300">Contoh lengkap dari awal sampai akhir:</p>
              <pre className="bg-black text-gray-100 p-4 rounded-lg border border-gray-700 font-mono text-xs overflow-x-auto">
                {`# 1. Fetch latest updates
$ git fetch origin

# 2. Stash perubahan lokal (jika ada)
$ git stash save "WIP: login feature"

# 3. Pull latest changes
$ git pull origin develop

# 4. Create & checkout ke feature branch
$ git checkout -b feature/login

# 5. Development work
# ... edit files, commit changes ...
$ git add .
$ git commit -m "feat: add login functionality"

# 6. Fetch before push
$ git fetch origin

# 7. Pop stash jika ada
$ git stash pop

# 8. Pull untuk sync dengan develop
$ git pull origin develop

# 9. Handle conflict jika ada
# ... resolve conflicts ...

# 10. Merge develop ke feature
$ git merge develop

# 11. Push feature branch
$ git push origin feature/login

# 12. Create Pull Request (via GitHub/GitLab)
# ... review & approval process ...

# 13. Merge ke main/develop (via PR)
# ... merge & delete branch ...

# 14. Cleanup local branch
$ git branch -d feature/login`}
              </pre>
            </div>
          ),
        },
        {
          id: 'workflow-tips',
          title: 'Tips & Best Practices',
          content: (
            <div className="space-y-3">
              <div className="bg-teal-950/30 p-4 rounded border border-teal-800">
                <ul className="space-y-2 text-teal-200 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>
                      <strong>Commit sering:</strong> Kecil changes, mudah di-review
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>
                      <strong>Pull sebelum push:</strong> Hindari conflict
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>
                      <strong>Gunakan branch naming:</strong> feature/, bugfix/, hotfix/
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>
                      <strong>Code review:</strong> Selalu via Pull Request
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-teal-400">✓</span>
                    <span>
                      <strong>Jangan force push:</strong> Kecuali hotfix yang urgent
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          id: 'workflow-danger',
          title: 'Perintah Berbahaya',
          content: (
            <div className="space-y-3">
              <div className="bg-red-950/30 p-4 rounded border border-red-800">
                <p className="text-red-300 font-semibold mb-2">⚠️ Hindari perintah ini:</p>
                <ul className="space-y-2 text-red-200 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">✗</span>
                    <span>
                      <code className="bg-red-950 px-1">git push -f</code> (force push) - Bisa ngilang commit orang lain
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✗</span>
                    <span>
                      <code className="bg-red-950 px-1">git reset --hard</code> - Menghapus semua perubahan lokal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✗</span>
                    <span>
                      <code className="bg-red-950 px-1">git clean -fd</code> - Menghapus semua untracked files
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    purple: 'bg-purple-600 text-white',
    orange: 'bg-orange-600 text-white',
    red: 'bg-red-600 text-white',
    pink: 'bg-pink-600 text-white',
    teal: 'bg-teal-600 text-white',
  };

  const borderClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    orange: 'border-orange-500',
    red: 'border-red-500',
    pink: 'border-pink-500',
    teal: 'border-teal-500',
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Git Flow Tutorial</h1>
              <p className="text-teal-400 mt-1">Complete Workflow untuk Team Development</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden bg-blue-900/50 p-2 rounded-lg hover:bg-blue-800/50 transition-colors border border-blue-800"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block fixed lg:sticky top-24 lg:top-8 left-0 w-64 h-screen lg:h-auto bg-gray-900 lg:bg-transparent z-50 lg:z-auto overflow-y-auto lg:overflow-visible p-4 lg:p-0 shadow-xl lg:shadow-none border-r border-gray-800 lg:border-0`}
          >
            <div className="bg-gray-900 rounded-lg shadow-xl p-4 lg:sticky lg:top-8 border border-gray-800">
              <h3 className="font-bold text-gray-200 mb-3 flex items-center">
                <BookOpen size={20} className="mr-2 text-teal-400" />
                Daftar Isi
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-teal-400 rounded-lg transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections[section.id];

              return (
                <div
                  key={section.id}
                  id={section.id}
                  className={`bg-gray-900 rounded-xl shadow-xl overflow-hidden border-l-4 ${borderClasses[section.color]} scroll-mt-24 border border-gray-800 hover:shadow-2xl transition-shadow`}
                >
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-800/50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg ${colorClasses[section.color]}`}
                        >
                          <Icon size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100">
                          {section.title}
                        </h2>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={24} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={24} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-800">
                      {section.content && (
                        <div className="mb-6 pt-6">
                          {section.content}
                        </div>
                      )}

                      {section.steps && (
                        <div className="space-y-4">
                          {section.steps.map((step) => {
                            const isComplete = completedSteps[step.id];

                            return (
                              <div
                                key={step.id}
                                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950 hover:border-gray-700 transition-colors"
                              >
                                <div className="flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-800/70 transition-colors">
                                  <button
                                    onClick={() => toggleComplete(step.id)}
                                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                      isComplete
                                        ? 'bg-green-600 border-green-600'
                                        : 'border-gray-600 hover:border-green-500'
                                    }`}
                                  >
                                    {isComplete && (
                                      <CheckCircle
                                        size={16}
                                        className="text-white"
                                      />
                                    )}
                                  </button>
                                  <h3
                                    className={`font-semibold flex-1 ${
                                      isComplete
                                        ? 'text-gray-500 line-through'
                                        : 'text-gray-200'
                                    }`}
                                  >
                                    {step.title}
                                  </h3>
                                  <Terminal
                                    size={18}
                                    className="text-gray-600"
                                  />
                                </div>
                                <div className="p-4 space-y-3">
                                  {step.content}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Summary Section */}
            <div className="bg-gradient-to-r from-teal-950/50 to-blue-950/50 rounded-xl p-8 border border-teal-800 shadow-xl">
              <div className="flex items-start gap-4">
                <AlertCircle size={32} className="text-teal-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-teal-300 mb-3">
                    Ringkasan Git Flow
                  </h3>
                  <ul className="space-y-2 text-teal-200 text-sm">
                    <li>
                      <strong>Fetch:</strong> Update info dari remote repository
                    </li>
                    <li>
                      <strong>Stash:</strong> Simpan perubahan temporary jika butuh switch branch
                    </li>
                    <li>
                      <strong>Pull:</strong> Download & merge latest changes
                    </li>
                    <li>
                      <strong>Checkout:</strong> Pindah atau buat branch baru
                    </li>
                    <li>
                      <strong>Pop:</strong> Ambil kembali stashed changes
                    </li>
                    <li>
                      <strong>Merge:</strong> Gabung perubahan dari satu branch ke branch lain
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 border-t border-gray-800">
              <p className="text-gray-400">
                Selamat! Kamu sudah memahami Git Flow untuk team development 🚀
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Praktikkan dan share ilmu ke team kamu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}