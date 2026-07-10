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

    const disaster =
      await prisma.disaster.findUnique({

        where: {

          id: params.id

        },

        include: {

          location: {

            include: {

              coordinates: true

            }

          }

        }

      });

    if (!disaster) {

      return NextResponse.json(
        {
          error:
            "Disaster not found."
        },
        {
          status: 404
        }
      );

    }

    return NextResponse.json(
      disaster,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Internal Server Error"
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

    const disaster =
      await prisma.disaster.update({

        where: {

          id: params.id

        },

        data: body,

        include: {

          location: {

            include: {

              coordinates: true

            }

          }

        }

      });

    return NextResponse.json(
      disaster,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to update disaster."
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

    await prisma.disaster.delete({

      where: {

        id: params.id

      }

    });

    return NextResponse.json(
      {
        message:
          "Disaster deleted successfully."
      },
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to delete disaster."
      },
      {
        status: 500
      }
    );

  }

}