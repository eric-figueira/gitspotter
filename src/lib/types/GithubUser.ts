export default interface GithubUser {
  avatar_url: string,
  followers: number,
  followers_url: string,
  following: number,
  following_url: string,
  html_url: string,
  login: string,
  name: string,
  public_repos: number,
  followsBack?: boolean | undefined,
}