"use client"

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Book, Database, Code, Eye, Settings, CheckCircle, Menu, X } from 'lucide-react';
import "../globals.css";

export default function AdminLabTutorial() {
    const [expandedSections, setExpandedSections] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSection = (id) => {
        setExpandedSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleComplete = (id) => {
        setCompletedSteps(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const sections = [
        {
            id: 'intro',
            title: 'Deskripsi Singkat',
            icon: Book,
            color: 'blue',
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Task ini fokus buat menampilkan data dari table <code className="bg-gray-800 px-2 py-1 rounded text-sm text-blue-400">nama_table</code> ke view.
                    </p>
                    <div className="bg-blue-950/50 border-l-4 border-blue-500 p-4">
                        <p className="text-blue-300 font-medium">
                            ⚠️ Nggak ada proses create/update/delete dulu. Pure ambil data dan render ke UI.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'model',
            title: '1. Membuat Model',
            icon: Database,
            color: 'green',
            steps: [
                {
                    id: 'model-file',
                    title: 'Buat File Model',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Buat file model baru di:</p>
                            <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-800">
                                <code className="text-blue-400">app/Models/{'{NamaModel}'}.php</code>
                            </div>
                            <p className="text-sm text-gray-400">Kamu bisa copy struktur dari Roles.php</p>
                        </div>
                    )
                },
                {
                    id: 'model-structure',
                    title: 'Struktur Model',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Struktur dasar model:</p>
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`<?php

namespace App\\Models;

use Core\\Model;

class {NamaModel} extends Model
{
    protected $table = '{nama_table}';
}`}
                            </pre>
                            <div className="bg-blue-950/30 p-3 rounded border border-blue-800">
                                <p className="text-sm text-blue-300">
                                    <strong>Yang perlu diubah:</strong>
                                    <br />• <code className="bg-blue-950 px-1">{'{NamaModel}'}</code> → nama model kamu
                                    <br />• <code className="bg-blue-950 px-1">$table</code> → nama table database
                                </p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'model-function',
                    title: 'Fungsi Get Data',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Tambahkan fungsi untuk mengambil data:</p>
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`public function getAll()
{
    return $this->db->query(
    "SELECT {columns} FROM {$this->table} 
    ORDER BY \\"{order_by}\\""
    )->all();
}`}
                            </pre>
                            <div className="bg-green-950/30 p-3 rounded border border-green-800">
                                <p className="text-sm text-green-300">
                                    <strong>Yang perlu diisi:</strong>
                                    <br />• <code className="bg-green-950 px-1">{'{columns}'}</code> → daftar kolom yang ingin ditampilkan
                                    <br />• <code className="bg-green-950 px-1">{'{order_by}'}</code> → kolom sorting default
                                </p>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'controller',
            title: '2. Membuat Controller',
            icon: Code,
            color: 'purple',
            steps: [
                {
                    id: 'controller-file',
                    title: 'Buat File Controller',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Buat file controller baru:</p>
                            <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-800">
                                <code className="text-blue-400">app/Controllers/{'{NamaController}'}.php</code>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'controller-structure',
                    title: 'Struktur Controller',
                    content: (
                        <div className="space-y-3">
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`<?php
namespace App\\Controllers;

use App\\Models\\{NamaModel};
use Core\\Controller;

class {NamaController} extends Controller
{
        protected \${modelVar};

        public function __construct()
        {
            if (!attempt_auto_login()) {
                redirect(base_url('admin/login'));
                exit;
            }

            $this->{modelVar} = new {NamaModel}();
        }
}`}
                            </pre>
                            <div className="bg-purple-950/30 p-3 rounded border border-purple-800">
                                <p className="text-sm text-purple-300">
                                    <strong>Ganti bagian:</strong>
                                    <br />• <code className="bg-purple-950 px-1">{'{NamaController}'}</code> → nama controller
                                    <br />• <code className="bg-purple-950 px-1">{'{NamaModel}'}</code> → model yang dipakai
                                    <br />• <code className="bg-purple-950 px-1">{'{modelVar}'}</code> → nama properti model
                                </p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'constructor-explain',
                    title: 'Apa itu __construct()?',
                    content: (
                        <div className="space-y-3 bg-indigo-950/40 p-4 rounded-lg border border-indigo-800">
                            <p className="font-semibold text-indigo-300">Constructor adalah fungsi yang otomatis jalan saat class dibuat.</p>
                            <div className="space-y-2 text-sm text-indigo-200">
                                <p><strong>Di project ini dipakai untuk:</strong></p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li><strong>Validasi login:</strong> Cek user sudah login via <code className="bg-indigo-950 px-1">attempt_auto_login()</code></li>
                                    <li><strong>Redirect otomatis:</strong> Kalau belum login → lempar ke halaman login</li>
                                    <li><strong>Inisialisasi Model:</strong> Biar model siap dipakai di semua fungsi</li>
                                </ul>
                                <p className="mt-3 font-medium">Intinya: constructor = "penjaga pintu" + "penyedia resource"</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'controller-index',
                    title: 'Fungsi index() - Return View',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Buat fungsi untuk menampilkan halaman:</p>
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`public function index()
{
    $data = [
        'title' => '{JudulHalaman}',
    ];

    view_with_layout('admin/{folder}/{view}', $data);
}`}
                            </pre>
                            <div className="bg-blue-950/30 p-3 rounded border border-blue-800">
                                <p className="text-sm text-blue-300">
                                    <strong>Yang perlu diisi:</strong>
                                    <br />• <code className="bg-blue-950 px-1">{'{JudulHalaman}'}</code> → judul halaman
                                    <br />• <code className="bg-blue-950 px-1">{'{folder}'}</code> → nama folder view (misal: roles)
                                    <br />• <code className="bg-blue-950 px-1">{'{view}'}</code> → file view (misal: index)
                                </p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'controller-data',
                    title: 'Fungsi data() - JSON Response',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Endpoint untuk ambil data via AJAX/DataTables:</p>
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`public function data()
{
    try {
        $items = $this->{modelVar}->getAll();

        return response()->json([
            'success' => true,
            'message' => 'Success',
            'data' => $items
        ], 200);
    } catch (\\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan: ' . $e->getMessage()
        ], 500);
    }
}`}
                            </pre>
                            <div className="bg-green-950/30 p-3 rounded text-sm text-green-300 border border-green-800">
                                <p><strong>Fungsi ini untuk:</strong></p>
                                <ul className="list-disc list-inside ml-2 mt-1">
                                    <li>Return data dalam bentuk JSON</li>
                                    <li>Dipanggil frontend (AJAX, DataTables, fetch API)</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'view',
            title: '3. Membuat View',
            icon: Eye,
            color: 'orange',
            steps: [
                {
                    id: 'view-location',
                    title: 'Lokasi File View',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Buat file view di:</p>
                            <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-800">
                                <code className="text-blue-400">Views/admin/{'{namaModul}'}/index.php</code>
                            </div>
                            <div className="bg-blue-950/30 p-3 rounded text-sm text-blue-300 border border-blue-800">
                                <p>View ini hanya berisi HTML tabel + script DataTables. Modal & form belum perlu dibuat.</p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'view-html',
                    title: 'HTML Struktur Tabel',
                    content: (
                        <div className="space-y-3">
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 border border-gray-800">
{`<div class="page-heading">
    <h3 class="page-title"><?php echo e($title ?? 'Judul Halaman'); ?></h3>
</div>

<div class="page-content">
    <section class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">{JudulTabel}</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover" id="data-tables">
                            <thead>
                                <tr>
                                    <th width="5%">No</th>
                                    <th>{NamaKolom1}</th>
                                    <th width="20%">{NamaKolomAksi}</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>`}
                            </pre>
                        </div>
                    )
                },
                {
                    id: 'view-datatables',
                    title: 'Script DataTables',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Script untuk load data otomatis:</p>
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 border border-gray-800">
{`<script>
    $(document).ready(function() {
        $('#data-tables').DataTable({
            processing: false,
            responsive: true,
            autoWidth: false,
            ajax: '<?php echo base_url("admin/{namaModul}/data"); ?>',
            columns: [
                {
                    data: null,
                    name: 'ordering',
                    orderable: false,
                    searchable: false,
                    render: function(data, type, row, meta) {
                        return meta.row + 1;
                    }
                },
                {
                    data: '{namaKolomDB}',
                    name: '{namaKolomDB}'
                },
                {
                    data: null,
                    name: 'action',
                    orderable: false,
                    searchable: false,
                    className: 'text-center',
                    render: function(data, type, row) {
                        return \`
                            <button type="button" class="btn btn-warning btn-sm" id="btnEdit">Edit</button>
                            <button type="button" class="btn btn-danger btn-sm" id="btnDelete">Hapus</button>
                        \`;
                    }
                },
            ]
        });
    });
</script>`}
                            </pre>
                            <div className="bg-orange-950/30 p-3 rounded text-sm text-orange-300 border border-orange-800">
                                <p><strong>Yang perlu disesuaikan:</strong></p>
                                <ul className="list-disc list-inside ml-2">
                                    <li><code className="bg-orange-950 px-1">{'{namaModul}'}</code> → slug modul</li>
                                    <li><code className="bg-orange-950 px-1">{'{namaKolomDB}'}</code> → nama kolom database</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'routes',
            title: '4. Setup Routes',
            icon: Settings,
            color: 'red',
            steps: [
                {
                    id: 'routes-file',
                    title: 'File Routes',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Tambahkan route di:</p>
                            <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-800">
                                <code className="text-blue-400">routes/admin.php</code>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'routes-code',
                    title: 'Kode Routes',
                    content: (
                        <div className="space-y-3">
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`get('/{namaModul}', [{NamaController}::class, 'index']);
get('/{namaModul}/data', [{NamaController}::class, 'data']);`}
                            </pre>
                            <div className="bg-blue-950/30 p-3 rounded text-sm border border-blue-800">
                                <p className="text-blue-300 font-semibold mb-2">Contoh implementasi:</p>
                                <pre className="bg-black p-2 rounded text-blue-400 border border-blue-900">
{`get('/user', [UserController::class, 'index']);
get('/user/data', [UserController::class, 'data']);`}
                                </pre>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'routes-explain',
                    title: 'Penjelasan Routes',
                    content: (
                        <div className="space-y-3 bg-red-950/30 p-4 rounded-lg border border-red-800">
                            <p className="text-red-300">
                                <strong>Route = Peta dari URL ke Controller</strong>
                            </p>
                            <div className="text-sm text-red-200 space-y-2">
                                <p>Misal user buka: <code className="bg-red-950 px-2 py-1 rounded">admin/roles</code></p>
                                <p>Browser diarahkan ke: <code className="bg-red-950 px-2 py-1 rounded">RolesController@index</code></p>
                                <p className="mt-3 font-medium">Tanpa routes, aplikasi nggak tau harus ngambil apa.</p>
                            </div>
                            <div className="mt-4 p-3 bg-red-950/50 rounded border border-red-900">
                                <p className="text-sm text-red-300">
                                    <strong>Method get():</strong> untuk HTTP GET (menampilkan halaman/ambil data, nggak ngubah data)
                                </p>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'sidebar',
            title: '5. Setup Menu Sidebar',
            icon: Menu,
            color: 'teal',
            steps: [
                {
                    id: 'sidebar-file',
                    title: 'File Sidebar',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Edit file:</p>
                            <div className="bg-black text-gray-100 p-4 rounded-lg border border-gray-800">
                                <code className="text-blue-400">Views/admin/layouts/component/sidebar.php</code>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'sidebar-code',
                    title: 'Struktur Menu',
                    content: (
                        <div className="space-y-3">
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 border border-gray-800">
{`$menus = [
    [
        'title' => 'Dashboard',
        'icon' => 'bi bi-grid-fill',
        'link' => base_url('admin/dashboard'),
    ],
    [
        'title' => 'Pengaturan',
        'icon' => 'bi bi-gear-fill',
        'children' => [
            ['title' => 'Roles', 'link' => base_url('admin/roles')],
            ['title' => 'Pengguna', 'link' => base_url('admin/pengguna')],
        ]
    ],
];`}
                            </pre>
                            <div className="bg-teal-950/30 p-3 rounded text-sm text-teal-300 border border-teal-800">
                                <p><strong>Penjelasan:</strong></p>
                                <ul className="list-disc list-inside ml-2 space-y-1">
                                    <li><code className="bg-teal-950 px-1">title</code> → nama menu</li>
                                    <li><code className="bg-teal-100 px-1">icon</code> → ikon Bootstrap Icons</li>
                                    <li><code className="bg-teal-950 px-1">link</code> → URL tujuan</li>
                                    <li><code className="bg-teal-950 px-1">children</code> → submenu (opsional)</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'testing',
            title: '6. Testing & Validasi',
            icon: CheckCircle,
            color: 'pink',
            steps: [
                {
                    id: 'test-login',
                    title: 'Step 1: Akses Login',
                    content: (
                        <div className="space-y-2">
                            <p className="text-gray-300">Buka browser ke:</p>
                            <div className="bg-black text-gray-100 p-3 rounded-lg border border-gray-800">
                                <code className="text-blue-400">/admin/login</code>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'test-credentials',
                    title: 'Step 2: Login ke Sistem',
                    content: (
                        <div className="space-y-2">
                            <div className="bg-pink-950/30 p-4 rounded-lg border border-pink-800">
                                <p className="font-semibold text-pink-300 mb-2">Kredensial:</p>
                                <p className="text-pink-200">Username: <code className="bg-pink-950 px-2 py-1 rounded">admin</code></p>
                                <p className="text-pink-200">Password: <code className="bg-pink-950 px-2 py-1 rounded">admin123</code></p>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'test-dummy',
                    title: 'Step 3: Isi Dummy Data',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Tambah beberapa data dummy ke database:</p>
                            <pre className="bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-800">
{`INSERT INTO users (name, email, role, status)
VALUES
('Niken Salsabila', 'niken@example.com', 'admin', 1),
('Dewi Lestari', 'dewi@example.com', 'staff', 1),
('Rizky Ananda', 'rizky@example.com', 'staff', 1);`}
                            </pre>
                        </div>
                    )
                },
                {
                    id: 'test-menu',
                    title: 'Step 4: Coba Menu',
                    content: (
                        <div className="space-y-2">
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                <li>Masuk ke sidebar → klik menu <strong>Pengaturan</strong></li>
                                <li>Pilih submenu <strong>Pengguna</strong></li>
                                <li>Pastikan halaman table kebuka tanpa error</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'test-validate',
                    title: 'Step 5: Validasi Data',
                    content: (
                        <div className="space-y-3">
                            <p className="text-gray-300">Checklist keberhasilan:</p>
                            <div className="bg-green-950/30 p-4 rounded-lg border border-green-800">
                                <ul className="space-y-2 text-green-300">
                                    <li className="flex items-start">
                                        <span className="mr-2">✓</span>
                                        <span>Bisa akses /admin/login</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✓</span>
                                        <span>Bisa login dengan akun admin</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✓</span>
                                        <span>Dummy data masuk database</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✓</span>
                                        <span>Menu sidebar muncul (Dashboard + Pengaturan + submenu)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">✓</span>
                                        <span>Data muncul di tabel sesuai controller</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            ]
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-600 text-white',
        green: 'bg-green-600 text-white',
        purple: 'bg-purple-600 text-white',
        orange: 'bg-orange-600 text-white',
        red: 'bg-red-600 text-white',
        teal: 'bg-teal-600 text-white',
        pink: 'bg-pink-600 text-white'
    };

    const borderClasses = {
        blue: 'border-blue-500',
        green: 'border-green-500',
        purple: 'border-purple-500',
        orange: 'border-orange-500',
        red: 'border-red-500',
        teal: 'border-teal-500',
        pink: 'border-pink-500'
    };

    return (
        <div className="min-h-screen bg-black text-gray-100">
            {/* Header */}
            <div className="text-white w-full flex justify-center text-center">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Admin Lab Inlet Tutorial</h1>
                            <p className="text-blue-300 mt-1">Get View Data Only - Panduan Lengkap</p>
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
                    <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-0 left-0 w-64 h-screen lg:h-auto bg-gray-950 lg:bg-transparent z-50 lg:z-auto overflow-y-auto lg:overflow-visible p-4 lg:p-0 shadow-xl lg:shadow-none border-r border-gray-800 lg:border-0`}>
                        <div className="bg-gray-900 rounded-lg shadow-xl p-4 lg:sticky lg:top-8 border border-gray-800">
                            <h3 className="font-bold text-gray-200 mb-3 flex items-center">
                                <Book size={20} className="mr-2 text-blue-400" />
                                Daftar Isi
                            </h3>
                            <nav className="space-y-1">
                                {sections.map(section => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        onClick={() => setSidebarOpen(false)}
                                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors"
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {sections.map(section => {
                            const Icon = section.icon;
                            const isExpanded = expandedSections[section.id];

                            return (
                                <div
                                    key={section.id}
                                    id={section.id}
                                    className={`bg-gray-900 rounded-xl shadow-xl overflow-hidden border-l-4 ${borderClasses[section.color]} scroll-mt-8 border border-gray-800`}
                                >
                                    <div
                                        className="p-6 cursor-pointer hover:bg-gray-850 transition-colors"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-3 rounded-lg ${colorClasses[section.color]}`}>
                                                    <Icon size={24} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-100">{section.title}</h2>
                                            </div>
                                            {isExpanded ? <ChevronDown size={24} className="text-gray-400" /> : <ChevronRight size={24} className="text-gray-400" />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-6 pb-6">
                                            {section.content && (
                                                <div className="mb-4">
                                                    {section.content}
                                                </div>
                                            )}

                                            {section.steps && (
                                                <div className="space-y-4">
                                                    {section.steps.map(step => {
                                                        const isComplete = completedSteps[step.id];

                                                        return (
                                                            <div
                                                                key={step.id}
                                                                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950"
                                                            >
                                                                <div className="flex items-center gap-3 p-4 bg-gray-900">
                                                                    <button
                                                                        onClick={() => toggleComplete(step.id)}
                                                                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isComplete
                                                                            ? 'bg-green-600 border-green-600'
                                                                            : 'border-gray-600 hover:border-green-500'
                                                                            }`}
                                                                    >
                                                                        {isComplete && (
                                                                            <CheckCircle size={16} className="text-white" />
                                                                        )}
                                                                    </button>
                                                                    <h3 className={`font-semibold ${isComplete ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                                                        {step.title}
                                                                    </h3>
                                                                </div>
                                                                <div className="p-4">
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