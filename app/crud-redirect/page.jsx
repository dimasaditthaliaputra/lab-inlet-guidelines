"use client"

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Code, Database, Route, Eye, Zap, AlertCircle } from 'lucide-react';

export default function CRUDTutorial() {
    const [activeTab, setActiveTab] = useState('index');
    const [expandedFlow, setExpandedFlow] = useState(null);

    const crudFlows = {
        index: {
            name: 'Lihat Daftar User (INDEX)',
            color: 'blue',
            steps: [
                {
                    stage: 'Route',
                    method: 'GET',
                    url: '/admin/userRedirect',
                    code: `get('/userRedirect', [UserRedirectController::class, 'index']),`,
                    description: 'User membuka halaman daftar user'
                },
                {
                    stage: 'Controller',
                    method: 'index()',
                    code: `public function index() {
    $users = $this->userModel->getAll();
    $data = ['title' => 'Daftar Pengguna', 'users' => $users];
    view_with_layout('admin/userRedirect/index', $data);
}`,
                    description: 'Controller memanggil getAll() dari model untuk ambil semua user'
                },
                {
                    stage: 'Model',
                    method: 'getAll()',
                    code: `public function getAll() {
    return $this->db->query(
        'SELECT u.*, r.role_name FROM users u 
         JOIN roles r ON u.id_roles = r.id'
    )->fetchAll();
}`,
                    description: 'Model menjalankan SQL SELECT dengan JOIN ke tabel roles'
                },
                {
                    stage: 'Database',
                    method: 'Query SQL',
                    code: `SELECT u.*, r.role_name FROM users u 
JOIN roles r ON u.id_roles = r.id;`,
                    description: 'Database mengembalikan data users dengan role_name'
                },
                {
                    stage: 'View',
                    method: 'index.php',
                    code: `<?php foreach ($users as $index => $row): ?>
    <tr>
        <td><?= $index + 1 ?></td>
        <td><?= e($row->username) ?></td>
        <td><?= e($row->email) ?></td>
        <td><?= e($row->full_name) ?></td>
        <td><?= e($row->role_name) ?></td>
    </tr>
<?php endforeach; ?>`,
                    description: 'View melakukan looping foreach untuk tampilkan data di tabel'
                }
            ]
        },
        create: {
            name: 'Form Tambah User (CREATE)',
            color: 'green',
            steps: [
                {
                    stage: 'Route',
                    method: 'GET',
                    url: '/admin/userRedirect/create',
                    code: `get('/userRedirect/create', [UserRedirectController::class, 'create']),`,
                    description: 'User membuka halaman form tambah user'
                },
                {
                    stage: 'Controller',
                    method: 'create()',
                    code: `public function create() {
    $roles = $this->roleModel->all();
    $data = [
        'title' => 'Tambah Pengguna Baru',
        'roles' => $roles
    ];
    view_with_layout('admin/userRedirect/create', $data);
}`,
                    description: 'Controller ambil semua roles untuk dropdown di form'
                },
                {
                    stage: 'Model',
                    method: 'all()',
                    code: `// Dari parent class Model
public function all() {
    return $this->db->query(
        "SELECT * FROM {$this->table}"
    )->fetchAll();
}`,
                    description: 'Model mengambil semua data roles dari tabel roles'
                },
                {
                    stage: 'View',
                    method: 'create.php',
                    code: `<div class="form-group">
    <label>Username</label>
    <input type="text" name="username" required>
</div>
<div class="form-group">
    <label>Role</label>
    <select name="id_roles" required>
        <?php foreach ($roles as $role): ?>
            <option value="<?= $role->id ?>">
                <?= e($role->role_name) ?>
            </option>
        <?php endforeach; ?>
    </select>
</div>`,
                    description: 'View menampilkan form kosong dengan dropdown roles'
                }
            ]
        },
        store: {
            name: 'Simpan User Baru (STORE)',
            color: 'purple',
            steps: [
                {
                    stage: 'Route',
                    method: 'POST',
                    url: '/admin/userRedirect/insert',
                    code: `post('/userRedirect/insert', [UserRedirectController::class, 'store']),`,
                    description: 'User submit form dengan method POST'
                },
                {
                    stage: 'Controller',
                    method: 'store()',
                    code: `public function store() {
    $data = [
        'username'  => request('username'),
        'email'     => request('email'),
        'full_name' => request('full_name'),
        'id_roles'  => request('id_roles'),
        'password'  => password_hash(request('password'), PASSWORD_DEFAULT)
    ];
    
    if ($this->userModel->create($data)) {
        flash('success', 'User berhasil ditambahkan');
    }
    redirect('admin/userRedirect');
}`,
                    description: 'Controller tangkap input, hash password, simpan via model'
                },
                {
                    stage: 'Model',
                    method: 'create()',
                    code: `public function create($data) {
    $columns = implode(', ', array_keys($data));
    $placeholders = ':' . implode(', :', array_keys($data));

    $this->db->query("INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})");

    foreach ($data as $key => $value) {
        $this->db->bind(':' . $key, $value);
    }

    if ($this->db->execute()) {
        return $this->db->lastInsertId();
    }
    return false;
}`,
                    description: 'Model jalankan INSERT query ke database'
                },
                {
                    stage: 'Database',
                    method: 'INSERT',
                    code: `INSERT INTO users (username, email, full_name, id_roles, password) 
VALUES ('abel', 'abel@mail.com', 'Abell', 1, '$2y$10...');`,
                    description: 'Database menyimpan data user baru'
                },
                {
                    stage: 'Redirect',
                    method: 'Redirect',
                    code: `redirect('admin/userRedirect');`,
                    description: 'Controller redirect ke index untuk lihat daftar user terbaru'
                }
            ]
        },
        edit: {
            name: 'Form Edit User (EDIT)',
            color: 'orange',
            steps: [
                {
                    stage: 'Route',
                    method: 'GET',
                    url: '/admin/userRedirect/{id}/edit',
                    code: `get('/userRedirect/{id}/edit', [UserRedirectController::class, 'edit']),`,
                    description: 'User klik tombol Edit untuk user tertentu (misal ID=5)'
                },
                {
                    stage: 'Controller',
                    method: 'edit($id)',
                    code: `public function edit($id) {
    $user = $this->userModel->find($id);
    
    if (!$user) {
        flash('error', 'User tidak ditemukan');
        redirect('admin/userRedirect');
        return;
    }
    
    $roles = $this->roleModel->all();
    $data = ['title' => 'Edit Pengguna', 'user' => $user, 'roles' => $roles];
    view_with_layout('admin/userRedirect/edit', $data);
}`,
                    description: 'Controller cari user by ID, ambil roles, kirim ke view'
                },
                {
                    stage: 'Model',
                    method: 'find($id)',
                    code: `public function find($id) {
    return $this->db->query("SELECT * FROM {$this->table} WHERE id = :id")
        ->bind(':id', $id)
        ->first();
}`,
                    description: 'Model query SELECT WHERE id = ? untuk ambil 1 user'
                },
                {
                    stage: 'View',
                    method: 'edit.php',
                    code: `<input type="text" name="username" 
       value="<?= old('username', $user->username) ?>" required>
<input type="email" name="email" 
       value="<?= old('email', $user->email) ?>" required>
<input type="password" name="password" 
       placeholder="Kosongkan jika tidak ubah">`,
                    description: 'View tampilkan form dengan value sudah terisi dari database'
                }
            ]
        },
        update: {
            name: 'Perbarui User (UPDATE)',
            color: 'indigo',
            steps: [
                {
                    stage: 'Route',
                    method: 'PUT',
                    url: '/admin/userRedirect/{id}/update',
                    code: `put('/userRedirect/{id}/update', [UserRedirectController::class, 'update']),`,
                    description: 'Form submit dengan method PUT (disimulasikan via POST + _method)'
                },
                {
                    stage: 'Controller',
                    method: 'update($id)',
                    code: `public function update($id) {
    $user = $this->userModel->find($id);
    
    $data = [
        'username'  => request('username'),
        'email'     => request('email'),
        'full_name' => request('full_name'),
        'id_roles'  => request('id_roles')
    ];
    
    $password = request('password');
    if (!empty($password)) {
        $data['password'] = password_hash($password, PASSWORD_DEFAULT);
    }
    
    if ($this->userModel->update($id, $data)) {
        flash('success', 'User berhasil diperbarui');
    }
    redirect('admin/userRedirect');
}`,
                    description: 'Controller tangkap input, cek password, update via model'
                },
                {
                    stage: 'Model',
                    method: 'update($id, $data)',
                    code: `public function update($id, $data) {
    $set = '';
    foreach ($data as $key => $value) {
        $set .= "{$key} = :{$key}, ";
    }
    $set = rtrim($set, ', ');

    $this->db->query("UPDATE {$this->table} SET {$set} WHERE id = :id");
    $this->db->bind(':id', $id);

    foreach ($data as $key => $value) {
        $this->db->bind(':' . $key, $value);
    }

    return $this->db->execute();
}`,
                    description: 'Model jalankan UPDATE query dengan WHERE id = ?'
                },
                {
                    stage: 'Database',
                    method: 'UPDATE',
                    code: `UPDATE users SET username = 'abel_baru', email = 'amanda@mail.com' 
WHERE id = 5;`,
                    description: 'Database update data user dengan ID 5'
                }
            ]
        },
        destroy: {
            name: 'Hapus User (DESTROY)',
            color: 'red',
            steps: [
                {
                    stage: 'Route',
                    method: 'DELETE',
                    url: '/admin/userRedirect/{id}/delete',
                    code: `delete('/userRedirect/{id}/delete', [UserRedirectController::class, 'destroy']),`,
                    description: 'User klik tombol Delete (POST + _method=DELETE)'
                },
                {
                    stage: 'Controller',
                    method: 'destroy($id)',
                    code: `public function destroy($id) {
    $user = $this->userModel->find($id);
    
    if (!$user) {
        flash('error', 'User tidak ditemukan');
    } else {
        if ($this->userModel->delete($id)) {
            flash('success', 'User berhasil dihapus');
        }
    }
    redirect('admin/userRedirect');
}`,
                    description: 'Controller cari user, validasi, delete via model'
                },
                {
                    stage: 'Model',
                    method: 'delete($id)',
                    code: `public function delete($id) {
    return $this->db->query("DELETE FROM {$this->table} WHERE id = :id")
        ->bind(':id', $id)
        ->execute();
}`,
                    description: 'Model jalankan DELETE query WHERE id = ?'
                },
                {
                    stage: 'Database',
                    method: 'DELETE',
                    code: `DELETE FROM users WHERE id = 5;`,
                    description: 'Database menghapus user dengan ID 5'
                }
            ]
        }
    };

    const colorMap = {
        blue: { bg: 'bg-blue-950/50', border: 'border-blue-700', text: 'text-blue-300', badge: 'bg-blue-600' },
        green: { bg: 'bg-green-950/50', border: 'border-green-700', text: 'text-green-300', badge: 'bg-green-600' },
        purple: { bg: 'bg-purple-950/50', border: 'border-purple-700', text: 'text-purple-300', badge: 'bg-purple-600' },
        orange: { bg: 'bg-orange-950/50', border: 'border-orange-700', text: 'text-orange-300', badge: 'bg-orange-600' },
        indigo: { bg: 'bg-indigo-950/50', border: 'border-indigo-700', text: 'text-indigo-300', badge: 'bg-indigo-600' },
        red: { bg: 'bg-red-950/50', border: 'border-red-700', text: 'text-red-300', badge: 'bg-red-600' }
    };

    const currentFlow = crudFlows[activeTab];
    const colors = colorMap[currentFlow.color];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
            {/* Header */}
            <div className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Route size={28} className="text-blue-400" />
                        <div>
                            <h1 className="text-3xl font-bold text-white">MVC CRUD Flow Visualizer</h1>
                            <p className="text-gray-400">UserRedirectController - Interactive Tutorial</p>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {Object.entries(crudFlows).map(([key, flow]) => (
                            <div
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all cursor-pointer ${
                                    activeTab === key
                                        ? `${colorMap[flow.color].badge} text-white`
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                            >
                                {flow.name.split('(')[1]?.replace(')', '')}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className={`text-2xl font-bold mb-2 ${colors.text}`}>{currentFlow.name}</h2>
                    <p className="text-gray-400">Ikuti alur dari Route → Controller → Model → Database → View</p>
                </div>

                {/* Flow Steps */}
                <div className="space-y-4">
                    {currentFlow.steps.map((step, idx) => (
                        <div key={idx}>
                            <div
                                onClick={() => setExpandedFlow(expandedFlow === idx ? null : idx)}
                                className={`w-full p-4 rounded-lg border-l-4 ${colors.border} ${colors.bg} hover:bg-opacity-70 transition-all flex items-center justify-between group cursor-pointer`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`${colors.badge} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm`}>
                                        {idx + 1}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-white">{step.stage}</span>
                                            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">{step.method}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-1">{step.description}</p>
                                    </div>
                                </div>
                                {expandedFlow === idx ? (
                                    <ChevronDown className="text-gray-400" />
                                ) : (
                                    <ChevronRight className="text-gray-400" />
                                )}
                            </div>

                            {expandedFlow === idx && (
                                <div className="mt-2 p-4 bg-black/50 rounded-lg border border-gray-800">
                                    {step.url && (
                                        <div className="mb-3 p-3 bg-gray-900 rounded border border-gray-800">
                                            <p className="text-xs text-gray-500 mb-1">URL</p>
                                            <code className="text-yellow-400 text-sm font-mono">{step.url}</code>
                                        </div>
                                    )}

                                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                                        <pre className="text-xs text-gray-300 p-4 overflow-x-auto">
                                            <code>{step.code}</code>
                                        </pre>
                                    </div>

                                    {idx < currentFlow.steps.length - 1 && (
                                        <div className="mt-3 flex items-center justify-center">
                                            <div className="w-0.5 h-6 bg-gray-700"></div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className={`mt-8 p-4 rounded-lg border-l-4 ${colors.border} ${colors.bg}`}>
                    <div className="flex gap-3">
                        <AlertCircle className={`flex-shrink-0 ${colors.text}`} size={20} />
                        <div>
                            <p className={`font-semibold ${colors.text}`}>Catatan Penting:</p>
                            <ul className="text-sm text-gray-300 mt-2 space-y-1 list-disc list-inside">
                                <li>Route mengarahkan HTTP request ke Controller method yang tepat</li>
                                <li>Controller mengatur logika & memanggil Model untuk database operation</li>
                                <li>Model menjalankan query SQL & berinteraksi dengan database</li>
                                <li>View menampilkan hasil atau form untuk user berinteraksi</li>
                                <li>Password selalu di-hash sebelum disimpan ke database</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}