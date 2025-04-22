from fastapi import FastAPI, Body
from typing import List, Annotated
import psycopg2
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


class Message(BaseModel):
    message: str


@app.post("/api/data")
def post_message(message: Message):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO messages (message) VALUES (%s);", (message.message,))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Data inserted successfully"}
