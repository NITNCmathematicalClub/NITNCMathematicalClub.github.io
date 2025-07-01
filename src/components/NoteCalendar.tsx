import React, { useState, useMemo, useEffect } from "react";

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
    const handleClickOutside = () => onClose();
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
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
          <div key={index} style={styles.noteItem}>
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
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notesForSelectedDate, setNotesForSelectedDate] = useState<Note[]>([]);

  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [bubblePosition, setBubblePosition] = useState<BubblePosition | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/notes.json")
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

    // 新しい formatDateToYYYYMMDD ヘルパー関数を使用
    const dateString = formatDateToYYYYMMDD(day);
    const foundNotes = allNotes.filter((note) => note.date === dateString);

    if (foundNotes.length > 0) {
      const targetRect = event.currentTarget.getBoundingClientRect();
      setBubblePosition({
        top: targetRect.bottom + window.scrollY + 8,
        left: targetRect.left + window.scrollX,
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
          // 該当日の雑記の数を取得
          const notesOnThisDay =
            day &&
            allNotes.filter((note) => note.date === formatDateToYYYYMMDD(day)); // ここでもヘルパー関数を使用
          const numberOfNotes = notesOnThisDay ? notesOnThisDay.length : 0;

          return (
            // dayCellを正方形にするための調整
            <div
              key={index}
              style={{
                ...styles.dayCellWrapper, // 新しいラッパースタイル
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
                {" "}
                {/* 日付とインジケーターをFlexboxで中央配置するためのコンテナ */}
                {day && (
                  <>
                    <span style={styles.dayNumber}>{day.getDate()}</span>
                    {/* 雑記の数だけインジケーターを表示 */}
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
    fontFamily: "sans-serif",
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
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    border: "1px solid #ccc",
  },
  weekDayHeader: {
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px 5px",
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ccc",
  },
  // 修正点: dayCellをラップするスタイルとしてdayCellWrapperを導入し、正方形にする
  dayCellWrapper: {
    position: "relative", // contentのabsolute配置の基準
    width: "100%", // グリッドのセル幅いっぱいに
    paddingBottom: "100%", // 幅と同じ高さにして正方形にする
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
    overflow: "hidden", // 内容がはみ出ないように
  },
  // 修正点: dayCellの中身を配置するためのコンテナ
  dayCellContent: {
    position: "absolute", // dayCellWrapperの中で絶対位置
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // 垂直方向中央
    alignItems: "center", // 水平方向中央
    padding: "8px", // 元々のパディングを保持
  },
  activeDayCell: { cursor: "pointer", transition: "background-color 0.2s" },
  emptyDayCell: { backgroundColor: "#fafafa" },
  selectedDayCell: { backgroundColor: "#d0e8ff", fontWeight: "bold" },

  // 修正点: 複数インジケーターのためのコンテナと、各インジケーターのスタイル
  noteIndicatorsContainer: {
    display: "flex", // インジケーターを横に並べる
    gap: "3px", // インジケーター間のスペース
    position: "absolute", // セル内で絶対位置
    bottom: "5px", // 下からの位置
    left: "50%", // 水平方向中央
    transform: "translateX(-50%)", // 自身の中央を基準にずらす
  },
  noteIndicator: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    // 各インジケーターにはmarginRightを不要にしたため削除
  },
  dayNumber: {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "4px", // インジケーターコンテナとの間隔
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
    borderBottom: "1px solid #eee",
    padding: "10px 0",
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
