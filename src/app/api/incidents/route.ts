import { NextRequest, NextResponse } from "next/server";

import { reportIncidentUseCase } from "@/infrastructure/container";
import { prisma } from "@/infrastructure/persistence/prisma/PrismaClient";

import { ReportIncidentCommand } from "@/application/incident/commands/ReportIncidentCommand";

export async function GET() {

  try {

    const incidents =
      await prisma.incident.findMany({

        include: {

          disaster: true,

          location: {

            include: {
              coordinates: true
            }

          },

          reportedByAgency: true

        },

        orderBy: {
          createdAt: "desc"
        }

      });

    return NextResponse.json(
      incidents,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error: "Internal Server Error"
      },
      {
        status: 500
      }
    );

  }

}

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      (await request.json()) as ReportIncidentCommand;

    const result =
      await reportIncidentUseCase.execute(
        body
      );

    if (result.isFailure) {

      return NextResponse.json(

        {
          error: result.error
        },

        {
          status: 400
        }

      );

    }

    return NextResponse.json(

      result.getValue(),

      {
        status: 201
      }

    );

  } catch {

    return NextResponse.json(

      {
        error: "Internal Server Error"
      },

      {
        status: 500
      }

    );

  }

}