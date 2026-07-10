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

    const agency =
      await prisma.agency.findUnique({

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

    if (!agency) {

      return NextResponse.json(
        {
          error:
            "Agency not found."
        },
        {
          status: 404
        }
      );

    }

    return NextResponse.json(
      agency,
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

    const agency =
      await prisma.agency.update({

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
      agency,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to update agency."
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

    await prisma.agency.delete({

      where: {

        id: params.id

      }

    });

    return NextResponse.json(
      {
        message:
          "Agency deleted successfully."
      },
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to delete agency."
      },
      {
        status: 500
      }
    );

  }

}