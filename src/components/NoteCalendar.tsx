import React, { useState, useMemo, useEffect } from "react";
import getBase from "./getBaseURL";

// --------------------------------
// 1. 型定義
// --------------------------------
type Note = {
  date: string;
  content: string;
  author: string;
};

// 日付をローカルタイムゾーンで YYYY-MM-DD 形式にフォーマットするヘルパー関数
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月は0から始まるため+1
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// --------------------------------
// 2. 吹き出しコンポーネント
// --------------------------------
// NoteBubble component removed because it was defined but never used.

// --------------------------------
// 3. メインのカレンダーコンポーネント
// --------------------------------
const NoteCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notesForSelectedDate, setNotesForSelectedDate] = useState<Note[]>([]);

  const [allNotes, setAllNotes] = useState<Note[]>([]);
  // const [bubblePosition, setBubblePosition] = useState<BubblePosition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes from backend when component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(getBase("notes.json"));
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const data: Note[] = await response.json();
        setAllNotes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("不明なエラーが発生しました");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentDate]);

  const handleDateClick = (day: Date | null) => {
    if (!day) return;

    // 既に選択されている日付を再度クリックした場合、枠を閉じる
    if (selectedDate && day.getTime() === selectedDate.getTime()) {
      setSelectedDate(null);
      setNotesForSelectedDate([]);
      return;
    }

    const dateString = formatDateToYYYYMMDD(day);
    const foundNotes = allNotes.filter((note) => note.date === dateString);

    setSelectedDate(day);
    setNotesForSelectedDate(foundNotes);
  };

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setNotesForSelectedDate([]);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setNotesForSelectedDate([]);
  };

  const monthName = `${currentDate.getFullYear()}年 ${
    currentDate.getMonth() + 1
  }月`;
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  if (isLoading) {
    return <div>読み込み中...</div>;
  }
  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.calendarHeader}>
        <button style={styles.navButton} onClick={goToPrevMonth}>
          ＜ 前月
        </button>
        <h2 style={{ margin: 0 }}>{monthName}</h2>
        <button style={styles.navButton} onClick={goToNextMonth}>
          次月 ＞
        </button>
      </div>
      <div style={styles.calendarGrid}>
        {weekDays.map((day) => (
          <div key={day} style={styles.weekDayHeader}>
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const notesOnThisDay =
            day &&
            allNotes.filter((note) => note.date === formatDateToYYYYMMDD(day));
          const numberOfNotes = notesOnThisDay ? notesOnThisDay.length : 0;

          return (
            <div
              key={index}
              style={{
                ...styles.dayCellWrapper,
                ...(day ? styles.activeDayCell : styles.emptyDayCell),
                ...(day &&
                selectedDate &&
                day.getTime() === selectedDate.getTime()
                  ? styles.selectedDayCell
                  : {}),
              }}
              onClick={() => handleDateClick(day)}
            >
              <div style={styles.dayCellContent}>
                {day && (
                  <>
                    <span style={styles.dayNumber}>{day.getDate()}</span>
                    {numberOfNotes > 0 && (
                      <div style={styles.noteIndicatorsContainer}>
                        {[...Array(numberOfNotes)].map((_, i) => (
                          <div key={i} style={styles.noteIndicator}></div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* クリックしたセルの真下に雑記の枠を絶対配置で表示 */}
      {notesForSelectedDate.length > 0 && (
        <div style={styles.noteBox}>
          {notesForSelectedDate.map((note, index) => (
            <div
              key={index}
              style={{
                ...styles.noteItem,
                ...(index < notesForSelectedDate.length - 1
                  ? styles.noteItemBorder
                  : {}),
              }}
            >
              <p style={styles.noteContent}>{note.content}</p>
              <p style={styles.noteAuthor}>- {note.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --------------------------------
// 4. スタイル定義
// --------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "serif extrabold",
    width: "90%",
    maxWidth: "600px",
    margin: "20px auto",
    position: "relative",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  navButton: {
    padding: "5px 15px",
    fontSize: "1em",
    backgroundColor: "white",
    border: "1px solid #cea152",
    borderRadius: "4px",
    cursor: "pointer",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    border: "1px solid #DDDDDD",
  },
  weekDayHeader: {
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px 5px",
    backgroundColor: "#403732",
    borderBottom: "1px solid #ccc",
    color: "white",
  },
  dayCellWrapper: {
    position: "relative",
    width: "100%",
    paddingBottom: "100%",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
    overflow: "hidden",
  },
  dayCellContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
  },
  dayNumber: {
    fontWeight: "bold", // ここで数字を太くする
  },
  activeDayCell: { cursor: "pointer", transition: "background-color 0.2s" },
  emptyDayCell: { backgroundColor: "#fafafa" },
  selectedDayCell: {
    backgroundColor: "#F4D35E",
    fontWeight: "bold",
  },
  noteIndicatorsContainer: {
    display: "flex",
    gap: "3px",
    position: "absolute",
    bottom: "5px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  noteIndicator: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#cea152",
  },
  noteBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "90%",
    maxWidth: "500px",
    padding: "20px",
    border: "2px solid #cea152",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  },
  noteItem: {
    padding: "10px 0",
  },
  noteItemBorder: {
    borderBottom: "1px solid #eee",
  },
  noteContent: {
    margin: 0,
    whiteSpace: "pre-wrap",
    fontSize: "0.95em",
  },
  noteAuthor: {
    margin: "5px 0 0",
    textAlign: "right",
    fontSize: "0.85em",
    color: "#555",
  },
};

export default NoteCalendar;
