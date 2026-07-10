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

    const shelter =
      await prisma.shelter.findUnique({

        where: {

          id: params.id

        },

        include: {

          location: {

            include: {

              coordinates: true

            }

          },

          managingAgency: true

        }

      });

    if (!shelter) {

      return NextResponse.json(
        {
          error:
            "Shelter not found."
        },
        {
          status: 404
        }
      );

    }

    return NextResponse.json(
      shelter,
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

    const shelter =
      await prisma.shelter.update({

        where: {

          id: params.id

        },

        data: body,

        include: {

          location: {

            include: {

              coordinates: true

            }

          },

          managingAgency: true

        }

      });

    return NextResponse.json(
      shelter,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to update shelter."
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

    await prisma.shelter.delete({

      where: {

        id: params.id

      }

    });

    return NextResponse.json(
      {
        message:
          "Shelter deleted successfully."
      },
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to delete shelter."
      },
      {
        status: 500
      }
    );

  }

}