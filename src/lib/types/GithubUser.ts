export default interface GithubUser {
  avatar_url: string,
  followers_url: string,
  following_url: string,
  html_url: string,
  login: string,
  type: "User" | "Organization",
  followsBack?: boolean | undefined,
}