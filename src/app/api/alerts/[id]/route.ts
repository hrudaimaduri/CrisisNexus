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

    const alert =
      await prisma.alert.findUnique({

        where: {

          id: params.id

        },

        include: {

          disaster: true,

        }

      });

    if (!alert) {

      return NextResponse.json(
        {
          error: "Alert not found."
        },
        {
          status: 404
        }
      );

    }

    return NextResponse.json(
      alert,
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

    const alert =
      await prisma.alert.update({

        where: {

          id: params.id

        },

        data: body,

        include: {

          disaster: true,


        }

      });

    return NextResponse.json(
      alert,
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error: "Unable to update alert."
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

    await prisma.alert.delete({

      where: {

        id: params.id

      }

    });

    return NextResponse.json(
      {
        message: "Alert deleted successfully."
      },
      {
        status: 200
      }
    );

  } catch {

    return NextResponse.json(
      {
        error: "Unable to delete alert."
      },
      {
        status: 500
      }
    );

  }

}