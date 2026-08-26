import { ContentType } from "@/types/content-type/contentType";
import { ContentStatus } from "@/types/content-status/content-status";
import { Media } from "@/features/content/entity/media";

export const testMediaList: Media[] = [
  {
    id: 1,
    name: "Интерстеллар",
    genres: ["Фантастика", "Драма", "Приключения"],
    rate: 8,
    contentType: "film" as ContentType,
    contentStatus: "completed" as ContentStatus,
    dateOfAdd: new Date("2026-01-15"),
    dateOfMedia: new Date("2014-11-07"),
    discription:
      "Группа исследователей отправляется через червоточину в поисках нового дома для человечества.",
    tags: ["космос", "время", "семья"],
    adictInf: [],
  },
  {
    id: 2,
    name: "Во все тяжкие",
    genres: ["Драма", "Криминал", "Триллер"],
    rate: 9,
    contentType: "series" as ContentType,
    contentStatus: "completed" as ContentStatus,
    dateOfAdd: new Date("2026-01-20"),
    dateOfMedia: new Date("2008-01-20"),
    discription:
      "Учитель химии начинает производить запрещённые вещества, чтобы обеспечить будущее своей семьи.",
    tags: ["криминал", "химия", "месть"],
    adictInf: [],
  },
  {
    id: 3,
    name: "Ведьмак",
    genres: ["Фэнтези", "Драма", "Приключения"],
    rate: 8,
    contentType: "series" as ContentType,
    contentStatus: "in_progress" as ContentStatus,
    dateOfAdd: new Date("2026-02-03"),
    dateOfMedia: new Date("2019-12-20"),
    discription:
      "Мутант-наёмник Геральт из Ривии охотится на чудовищ и пытается найти своё место в мире.",
    tags: ["монстры", "магия", "ведьмак"],
    adictInf: [],
  },
  {
    id: 4,
    name: "Начало",
    genres: ["Фантастика", "Боевик", "Триллер"],
    rate: 8,
    contentType: "film" as ContentType,
    contentStatus: "planning" as ContentStatus,
    dateOfAdd: new Date("2026-02-10"),
    dateOfMedia: new Date("2010-07-16"),
    discription:
      "Профессиональный вор проникает в сны людей, но получает задание внедрить идею в подсознание.",
    tags: ["сны", "ограбление", "подсознание"],
    adictInf: [],
  },
  {
    id: 5,
    name: "Начало 2",
    genres: ["Фантастика", "Боевик", "Триллер"],
    rate: 8,
    contentType: "film" as ContentType,
    contentStatus: "planning" as ContentStatus,
    dateOfAdd: new Date("2026-02-11"),
    dateOfMedia: new Date("2010-07-16"),
    discription:
      "Профессиональный вор проникает в сны людей, но получает задание внедрить идею в подсознание.",
    tags: ["сны", "ограбление", "подсознание"],
    adictInf: [],
  },
  {
    id: 6,
    name: "Начало 4",
    genres: ["Фантастика", "Боевик", "Триллер"],
    rate: 8,
    contentType: "film" as ContentType,
    contentStatus: "planning" as ContentStatus,
    dateOfAdd: new Date("2026-02-11"),
    dateOfMedia: new Date("2010-07-16"),
    discription:
      "Профессиональный вор проникает в сны людей, но получает задание внедрить идею в подсознание.",
    tags: ["сны", "ограбление", "подсознание"],
    adictInf: [],
  },
];
