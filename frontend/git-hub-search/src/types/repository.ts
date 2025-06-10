import { UserT } from "./user";

export type RepositoryT = {
  full_name: string;
  owner: UserT;
  stargazers_count: number;
  html_url: string;
  watchers_count: number;
  language: string;
}