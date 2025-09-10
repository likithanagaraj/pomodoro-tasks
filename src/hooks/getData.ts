import {
  localDayKey,
  parseDate,
  startOfDayLocal,
  startOfWeekMonday,
} from "@/lib/dates";
import { getPomodoroSessions } from "@/storage/pomodoro-storage";
import { PomodoroSession } from "@/types/pomodoro";
import { useEffect, useState } from "react";

export const useData = () => {
  const [pomodoroData, setPomodoroData] = useState<PomodoroSession[]>([]);
  const [totalPomodoroHours, setTotalPomodoroHours] = useState<number>(0);
  const [weekData, setWeekData] = useState();
  const [todayTotalPomodoroHours, setTodayTotalPomodoroHours] = useState();
  const [todayVsYesterdaysComparision, setTodayVsYesterdaysComparision] = useState();
  const [thisWeekVsLastWeekStat, setThisWeekVsLastWeekStat] = useState();

  useEffect(() => {
    const loadSession = async () => {
      const data = await getPomodoroSessions();
      console.log(JSON.stringify(data, null, 2));
      setPomodoroData(data);

      //   total hours
      setTotalPomodoroHours(
        data.reduce((accumulator, d) => {
          return accumulator + d.duration;
        }, 0)
      );

      // this week data
      //   TODO: I believe for this function there is mismatch data coming from the input

      /**
       * Returns Mon→Sun buckets for the current week, summing `duration`.
       * Future dates (strictly > today) contribute 0.
       */
      function getWeekData(tasks, now = new Date()) {
        const today0 = startOfDayLocal(now);
        const monday = startOfWeekMonday(today0);

        // Build buckets and a key->index map
        const week = [];
        const idx = new Map();
        for (let i = 0; i < 7; i++) {
          const d = new Date(monday);
          d.setDate(monday.getDate() + i);
          const key = localDayKey(d);
          week.push({ day: key, value: 0 });
          idx.set(key, i);
        }

        for (const t of tasks) {
          const dt = parseDate(t.startedAt);
          if (!(dt instanceof Date) || isNaN(dt)) continue;

          const day0 = startOfDayLocal(dt);

          // ignore future days
          if (day0.getTime() > today0.getTime()) continue;

          const key = localDayKey(day0);
          if (idx.has(key)) {
            week[idx.get(key)].value += Number(t.duration) || 0;
          }
        }

        return week;
      }

      function getTodayData(tasks, now = new Date()) {
        const today0 = startOfDayLocal(now);
        const tomorrow0 = new Date(today0);
        tomorrow0.setDate(today0.getDate() + 1);

        const todaysTasks = tasks.filter((t) => {
          const dt = parseDate(t.startedAt);
          return dt >= today0 && dt < tomorrow0;
        });

        const totalMins = todaysTasks.reduce(
          (sum, t) => sum + (Number(t.duration) || 0),
          0
        );

        return {
          totalMins,
          data: todaysTasks,
        };
      }

      // console.log("getTodayData(data)");
      // console.log(getTodayData(data));
      setTodayTotalPomodoroHours(getTodayData(data));

      // console.log("--------");
      const weekData = getWeekData(data); // today = your actual machine local date
      // console.log(weekData);
      setWeekData(weekData);

      function compareTodayVsYesterday(tasks, now = new Date()) {
        function parseDate(str) {
          if (typeof str === "string" && str.includes("T")) {
            return new Date(str);
          }
          const [hh, mm, ss, d, m, y] = str.split("-").map(Number);
          return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, ss ?? 0);
        }

        function startOfDay(d) {
          const x = new Date(d);
          x.setHours(0, 0, 0, 0);
          return x;
        }

        function totalForDay(tasks, targetDay) {
          const start = startOfDay(targetDay);
          const end = new Date(start);
          end.setDate(start.getDate() + 1);

          return tasks
            .filter((t) => {
              const dt = parseDate(t.startedAt);
              return dt >= start && dt < end;
            })
            .reduce((sum, t) => sum + (Number(t.duration) || 0), 0);
        }

        const today = startOfDay(now);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const todayTotal = totalForDay(tasks, today);
        const yesterdayTotal = totalForDay(tasks, yesterday);

        // Build message
        if (yesterdayTotal === 0 && todayTotal === 0) {
          return "No activity recorded for today or yesterday.";
        } else if (yesterdayTotal === 0) {
          return `Great start! You worked ${todayTotal} ${todayTotal < 60 ? "min" : "hr"} today (no work yesterday).`;
        }

        const diff = todayTotal - yesterdayTotal;
        const percent = Math.round((diff / yesterdayTotal) * 100);

        if (diff > 0) {
          return `🔥 +${percent}% better than yesterday`;
        } else if (diff < 0) {
          return `😴 ${Math.abs(percent)}% less than yesterday`;
        } else {
          return "⚖️ Same as yesterday, consistent!";
        }
      }
      console.log("todayVsYesterdaysComparision");
      console.log(compareTodayVsYesterday(data));
      setTodayVsYesterdaysComparision(compareTodayVsYesterday(data));

      function compareThisWeekVsLastWeek(tasks, now = new Date()) {
        function parseDate(str) {
          if (typeof str === "string" && str.includes("T")) {
            return new Date(str);
          }
          const [hh, mm, ss, d, m, y] = str.split("-").map(Number);
          return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, ss ?? 0);
        }

        function startOfDay(d) {
          const x = new Date(d);
          x.setHours(0, 0, 0, 0);
          return x;
        }

        function startOfWeekMonday(d) {
          const x = startOfDay(d);
          const offset = (x.getDay() + 6) % 7; // Mon=0 … Sun=6
          x.setDate(x.getDate() - offset);
          return x;
        }

        function totalForWeek(tasks, weekStart) {
          const start = startOfDay(weekStart);
          const end = new Date(start);
          end.setDate(start.getDate() + 7);

          return tasks
            .filter((t) => {
              const dt = parseDate(t.startedAt);
              return dt >= start && dt < end;
            })
            .reduce((sum, t) => sum + (Number(t.duration) || 0), 0);
        }

        // compute week ranges
        const thisWeekStart = startOfWeekMonday(now);
        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(thisWeekStart.getDate() - 7);

        const thisWeekTotal = totalForWeek(tasks, thisWeekStart);
        const lastWeekTotal = totalForWeek(tasks, lastWeekStart);

        // Build message
        if (lastWeekTotal === 0 && thisWeekTotal === 0) {
          return "No activity recorded for this week or last week.";
        } else if (lastWeekTotal === 0) {
          return `🚀 Great start! You worked ${thisWeekTotal}${thisWeekTotal < 60 ? "min" : "hr"} this week (no work last week).`;
        }

        const diff = thisWeekTotal - lastWeekTotal;
        const percent = Math.round((diff / lastWeekTotal) * 100);

        if (diff > 0) {
          return `🔥 +${percent}% better than last week`;
        } else if (diff < 0) {
          return `😴 ${Math.abs(percent)}% less than last week`;
        } else {
          return "⚖️ Same as last week, consistent!";
        }
      }

      setThisWeekVsLastWeekStat(compareThisWeekVsLastWeek(data))
    };
    loadSession();
  }, []);
  return {
    pomodoroData,
    totalPomodoroHours,
    weekData,
    todayTotalPomodoroHours,
    todayVsYesterdaysComparision,
    thisWeekVsLastWeekStat,
  };
};
