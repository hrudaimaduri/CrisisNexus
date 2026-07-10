import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/infrastructure/persistence/prisma/PrismaClient";

export async function GET() {

  try {

    const shelters =
      await prisma.shelter.findMany({

        include: {

          location: {

            include: {

              coordinates: true

            }

          },

          managingAgency: true

        },

        orderBy: {

          createdAt: "desc"

        }

      });

    return NextResponse.json(
      shelters,
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

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json();

    const shelter =
      await prisma.shelter.create({

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
        status: 201
      }
    );

  } catch {

    return NextResponse.json(
      {
        error:
          "Unable to create shelter."
      },
      {
        status: 500
      }
    );

  }

}