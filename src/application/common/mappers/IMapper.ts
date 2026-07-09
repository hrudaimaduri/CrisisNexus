import { Result } from "../../../domain/shared/result/Result";

export interface IMapper<Domain, Request, Response> {
  /**
   * Converts an application request (DTO/Command)
   * into a domain model.
   */
  toDomain(request: Request): Result<Domain>;

  /**
   * Converts a domain model into an application
   * response (DTO).
   */
  toResponse(domain: Domain): Response;
}