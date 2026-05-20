import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'fs'

const dataDir: string = path.join(__dirname, '..', 'data');
const dbPath: string = path.join(dataDir, 'runnynotes.db');

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
console.log("db loaded.");

db.exec(`

    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE NOT NULL,
        text_html TEXT NOT NULL DEFAULT '',
        strokes_json TEXT,
        stickers_json TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        bg_color TEXT NOT NULL DEFAULT '#FFF8F4',
        page_pattern TEXT NOT NULL DEFAULT 'blank' CHECK (page_pattern IN ('blank', 'dotted', 'lined', 'grid')),
        line_spacing INTEGER NOT NULL DEFAULT 32,
        font_family TEXT NOT NULL DEFAULT 'Caveat', 
        font_size INTEGER NOT NULL DEFAULT 18,
        text_color TEXT NOT NULL DEFAULT '#4A1B0C',
        updated_at TEXT NOT NULL DEFAULT (datetime('now')) 
    )
    
    `);

db.exec(`INSERT OR IGNORE INTO settings (id) VALUES (1)`);

export default db;