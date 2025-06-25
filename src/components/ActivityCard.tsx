import React from "react";

interface Activity {
  id: number;
  title: string;
  date: string;
  description: string;
  // images: string[];
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const styles = {
    activityCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      margin: "20px 0",
      maxWidth: "800px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    activityTable: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 10px", // 行間を広げる
      marginBottom: "15px",
    },
    tableTh: {
      border: "1px solid #ddd",
      padding: "12px", // セル内余白を増やして行間を視覚的に広げる
      textAlign: "left" as const,
      fontSize: "16px",
      backgroundColor: "#f4f4f4",
      color: "#333",
      fontWeight: "bold",
    },
    tableTd: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "left" as const,
      fontSize: "16px",
      color: "#666",
    },
    activityImages: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap" as const,
    },
    activityImage: {
      width: "150px",
      height: "150px",
      objectFit: "cover" as const,
      borderRadius: "4px",
    },
  };

  return (
    <div style={styles.activityCard}>
      <h3 className="h3-style">{activity.title}</h3>
      <table style={styles.activityTable} className="text-text-base">
        <thead>
          <tr>
            <th style={styles.tableTh}>日時</th>
            <td style={styles.tableTd}>{activity.date}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={styles.tableTh}>概要</th>
            <td style={styles.tableTd}>{activity.description}</td>
          </tr>
        </tbody>
      </table>
      {/* <div style={styles.activityImages}>
        {activity.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${activity.title} image ${index + 1}`}
            style={styles.activityImage}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ActivityCard;
