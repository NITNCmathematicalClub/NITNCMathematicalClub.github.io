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

type BubblePosition = {
  top: number;
  left: number;
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
type NoteBubbleProps = {
  notes: Note[];
  position: BubblePosition;
  onClose: () => void;
};

const NoteBubble: React.FC<NoteBubbleProps> = ({
  notes,
  position,
  onClose,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const bubble = document.getElementById("note-bubble-container");
      if (bubble && !bubble.contains(event.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      id="note-bubble-container" // IDを追加して、クリックイベントの判定に使用
      style={{
        ...styles.bubbleContainer,
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={styles.bubbleTail}></div>
      <div style={styles.notesContainer}>
        {notes.map((note, index) => (
          // 修正点: 最後の要素以外にボーダーを適用するロジック
          <div
            key={index}
            style={{
              ...styles.noteItem,
              ...(index < notes.length - 1 ? styles.noteItemBorder : {}),
            }}
          >
            <p style={styles.noteContent}>{note.content}</p>
            <p style={styles.noteAuthor}>- {note.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --------------------------------
// 3. メインのカレンダーコンポーネント
// --------------------------------
const NoteCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notesForSelectedDate, setNotesForSelectedDate] = useState<Note[]>([]);

  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [bubblePosition, setBubblePosition] = useState<BubblePosition | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getBase("/notes.json"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答がありませんでした");
        }
        return response.json();
      })
      .then((data: Note[]) => {
        setAllNotes(data);
      })
      .catch((err) => {
        console.error("データの読み込みに失敗しました:", err);
        setError("雑記データの読み込みに失敗しました。");
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  const handleDateClick = (
    day: Date | null,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!day) return;

    if (selectedDate && day.getTime() === selectedDate.getTime()) {
      handleCloseBubble();
      return;
    }

    const dateString = formatDateToYYYYMMDD(day);
    const foundNotes = allNotes.filter((note) => note.date === dateString);

    if (foundNotes.length > 0) {
      const targetRect = event.currentTarget.getBoundingClientRect();
      const bubbleMaxWidth = 350; // styles.bubbleContainer.maxWidth と同じ値
      const padding = 10;
      const windowWidth = window.innerWidth;
      let left = targetRect.left + window.scrollX;

      // 吹き出しの最大幅を考慮して、はみ出さないようにleft位置を調整
      if (left + bubbleMaxWidth > windowWidth - padding) {
        left = windowWidth - bubbleMaxWidth - padding;
      }
      if (left < padding) {
        left = padding;
      }

      setBubblePosition({
        top: targetRect.bottom + window.scrollY + 8,
        left: left,
      });
      setSelectedDate(day);
      setNotesForSelectedDate(foundNotes);
    } else {
      handleCloseBubble();
    }
  };

  const handleCloseBubble = () => {
    setSelectedDate(null);
    setBubblePosition(null);
    setNotesForSelectedDate([]);
  };

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    handleCloseBubble();
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    handleCloseBubble();
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
              onClick={(e) => handleDateClick(day, e)}
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

      {bubblePosition && notesForSelectedDate.length > 0 && (
        <NoteBubble
          notes={notesForSelectedDate}
          position={bubblePosition}
          onClose={handleCloseBubble}
        />
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
  bubbleContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    zIndex: 1000,
    width: "auto",
    minWidth: "250px",
    maxWidth: "350px",
  },
  bubbleTail: {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "20px",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid white",
    filter: "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))",
  },
  notesContainer: {
    maxHeight: "250px",
    overflowY: "auto",
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
