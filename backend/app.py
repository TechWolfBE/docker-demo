from fastapi import FastAPI
from typing import List
import psycopg2
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db_connection():
    return psycopg2.connect(
        host="db",
        database="appdb",
        user="appuser",
        password=os.environ.get("DB_PASSWORD", "password"),
    )


@app.get("/api/data")
def get_data() -> List[tuple]:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows
