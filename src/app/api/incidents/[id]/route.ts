import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/infrastructure/persistence/prisma/PrismaClient";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {

  try {

    const incident =
      await prisma.incident.findUnique({

        where: {
          id: params.id
        },

        include: {

          disaster: true,

          location: {
            include: {
              coordinates: true
            }
          },

          reportedByAgency: {
            include: {
              location: {
                include: {
                  coordinates: true
                }
              }
            }
          }

        }

      });

    if (!incident) {

      return NextResponse.json(
        {
          error: "Incident not found."
        },
        {
          status: 404
        }
      );

    }

    return NextResponse.json(
      incident,
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

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {

  try {

    const body =
      await request.json();

    const incident =
      await prisma.incident.update({

        where: {
          id: params.id
        },

        data: body,

        include: {

          disaster: true,

          location: {
            include: {
              coordinates: true
            }
          },

          reportedByAgency: true

        }

      });

    return NextResponse.json(
      incident,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error: "Unable to update incident."
      },
      {
        status: 500
      }
    );

  }

}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {

  try {

    await prisma.incident.delete({

      where: {
        id: params.id
      }

    });

    return NextResponse.json(
      {
        message:
          "Incident deleted successfully."
      },
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to delete incident."
      },
      {
        status: 500
      }
    );

  }

}